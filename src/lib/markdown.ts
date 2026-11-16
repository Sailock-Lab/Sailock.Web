// src/lib/markdown.ts
// Convertidor de Markdown a HTML sin dependencias, pensado para los tutoriales.
// Soporta: títulos, párrafos, negrita, cursiva, código, bloques de código, enlaces, imágenes,
// listas (con un nivel de anidado), listas numeradas, citas, tablas y separadores.
// El HTML que se escriba dentro del Markdown NO se interpreta: se muestra como texto (más seguro).

export interface Frontmatter {
    data: Record<string, string>;
    body: string;
}

// Lee el bloque inicial entre "---" con líneas "clave: valor".
export function parseFrontmatter(source: string): Frontmatter {
    const text = source.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
    const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
    if (!match) return { data: {}, body: text };

    const data: Record<string, string> = {};
    for (const line of match[1].split("\n")) {
        const kv = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/.exec(line);
        if (!kv) continue;
        let value = kv[2].trim();
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }
        data[kv[1]] = value;
    }
    return { data, body: text.slice(match[0].length) };
}

export interface RenderOptions {
    basePath?: string; // se antepone a las imágenes que empiezan por "/"
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function slugify(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-+|-+$/g, "");
}

function safeUrl(url: string): string {
    const clean = url.trim();
    if (/^(https?:|mailto:|\/|#|\.{1,2}\/)/i.test(clean)) return clean;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(clean)) return clean; // ruta relativa sin esquema
    return "#"; // javascript:, data:, file:...
}

function renderInline(raw: string, options: RenderOptions): string {
    const codes: string[] = [];
    // 1) Los trozos de código se guardan aparte para no tocar su contenido.
    let text = raw.replace(/`([^`]+)`/g, (_m, code: string) => {
        codes.push(`<code>${escapeHtml(code)}</code>`);
        return `\u0000${codes.length - 1}\u0000`;
    });
    text = escapeHtml(text);

    // 2) Imágenes y enlaces.
    text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_m, alt, src, title) => {
        let url = safeUrl(src);
        if (url.startsWith("/") && options.basePath) url = options.basePath + url;
        const t = title ? ` title="${title}"` : "";
        return `<img src="${url}" alt="${alt}"${t} loading="lazy" />`;
    });
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
        const url = safeUrl(href);
        const external = /^https?:/i.test(url);
        const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${url}"${attrs}>${label}</a>`;
    });

    // 3) Énfasis.
    text = text
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/__([^_]+)__/g, "<strong>$1</strong>")
        .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>")
        .replace(/(^|[^_\w])_([^_\s][^_]*?)_(?![_\w])/g, "$1<em>$2</em>")
        .replace(/~~([^~]+)~~/g, "<del>$1</del>");

    return text.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => codes[Number(i)]);
}

const LIST_ITEM = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;

function splitTableRow(line: string): string[] {
    return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
}

function renderBlocks(lines: string[], options: RenderOptions): string {
    const out: string[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.trim() === "") {
            i++;
            continue;
        }

        // Bloque de código.
        const fence = /^```\s*([\w-]*)\s*$/.exec(line);
        if (fence) {
            const code: string[] = [];
            i++;
            while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
            i++; // cierre
            const cls = fence[1] ? ` class="language-${fence[1]}"` : "";
            out.push(`<pre><code${cls}>${escapeHtml(code.join("\n"))}</code></pre>`);
            continue;
        }

        // Título.
        const heading = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
        if (heading) {
            const level = heading[1].length;
            const plain = heading[2].replace(/[`*_]/g, "");
            out.push(`<h${level} id="${slugify(plain)}">${renderInline(heading[2], options)}</h${level}>`);
            i++;
            continue;
        }

        // Separador.
        if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
            out.push("<hr />");
            i++;
            continue;
        }

        // Cita.
        if (/^\s*>/.test(line)) {
            const quote: string[] = [];
            while (i < lines.length && /^\s*>/.test(lines[i])) quote.push(lines[i++].replace(/^\s*>\s?/, ""));
            out.push(`<blockquote>${renderBlocks(quote, options)}</blockquote>`);
            continue;
        }

        // Tabla.
        if (line.includes("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(lines[i + 1])) {
            const head = splitTableRow(line);
            i += 2;
            const rows: string[][] = [];
            while (i < lines.length && lines[i].trim() !== "" && lines[i].includes("|")) rows.push(splitTableRow(lines[i++]));
            const th = head.map((c) => `<th>${renderInline(c, options)}</th>`).join("");
            const body = rows
                .map((r) => `<tr>${r.map((c) => `<td>${renderInline(c, options)}</td>`).join("")}</tr>`)
                .join("");
            out.push(`<table><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table>`);
            continue;
        }

        // Lista (con un nivel de anidado por sangría).
        const first = LIST_ITEM.exec(line);
        if (first) {
            const ordered = /\d/.test(first[2]);
            const baseIndent = first[1].length;
            const items: { text: string[]; children: string[] }[] = [];
            while (i < lines.length) {
                const cur = lines[i];
                const m = LIST_ITEM.exec(cur);
                if (m && m[1].length <= baseIndent) {
                    items.push({ text: [m[3]], children: [] });
                    i++;
                } else if (cur.trim() !== "" && /^\s{2,}/.test(cur) && items.length > 0) {
                    const target = items[items.length - 1];
                    if (LIST_ITEM.test(cur)) target.children.push(cur.slice(baseIndent + 2));
                    else target.text.push(cur.trim());
                    i++;
                } else {
                    break;
                }
            }
            const tag = ordered ? "ol" : "ul";
            const html = items
                .map((item) => {
                    const children = item.children.length ? renderBlocks(item.children, options) : "";
                    return `<li>${renderInline(item.text.join(" "), options)}${children}</li>`;
                })
                .join("");
            out.push(`<${tag}>${html}</${tag}>`);
            continue;
        }

        // Párrafo.
        const para: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() !== "" &&
            !/^(#{1,6}\s|```|\s*>)/.test(lines[i]) &&
            !LIST_ITEM.test(lines[i])
        ) {
            para.push(lines[i++].trim());
        }
        if (para.length === 0) {
            para.push(lines[i++].trim());
        }
        out.push(`<p>${renderInline(para.join(" "), options)}</p>`);
    }

    return out.join("\n");
}

export function renderMarkdown(source: string, options: RenderOptions = {}): string {
    const lines = source.replace(/\r\n?/g, "\n").split("\n");
    return renderBlocks(lines, options);
}
