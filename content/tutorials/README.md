# Tutorials (Markdown)

Every tutorial is a plain Markdown file. The website reads them at build time and publishes them under
`/tutorials/<category>/<slug>/`. No extra packages are needed.

## File structure

```
content/tutorials/
└── <category>/            one folder per category (see the list below)
    └── <slug>/            one folder per tutorial: lowercase, numbers and dashes only
        ├── en.md          one file per language (en, es, fr, de, it, pt, nl, pl, ru, ja, ko, zh)
        └── es.md
```

Categories (folder name → name shown on the website):

| Folder          | Category              |
| --------------- | --------------------- |
| `first-steps`   | First steps           |
| `two-factor`    | 2FA                   |
| `auto-lock`     | Auto-lock             |
| `generator`     | Generator             |
| `vault`         | Vault                 |
| `import-export` | Import & export       |
| `settings`      | Settings              |

Images go in `public/tutorials/<slug>/` and are used in the Markdown as `![description](/tutorials/<slug>/image.png)`.

To add a category, add it to `TUTORIAL_CATEGORIES` in `src/lib/tutorials-shared.ts` and its name to
`tutorials.categories` in every `src/locales/<lang>/tutorials.json`.

## Header of each file

Every `.md` starts with a block between `---` lines:

```
---
title: Create your first vault
description: One sentence that shows on the tutorial card.
order: 1
updated: 2026-11-15
draft: true
---
```

| Field         | Required | Meaning                                                                          |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| `title`       | yes      | Title of the page and of the card. Without it the file is ignored.               |
| `description` | no       | Short text on the card (also searchable).                                        |
| `order`       | no       | Position inside its category (taken from `en.md`, or the first language found). |
| `updated`     | no       | Date shown as "Last updated". Format `YYYY-MM-DD`.                               |
| `draft`       | no       | `true` = visible only with `npm run dev`; it is NOT published in production.     |

Remove `draft: true` when the tutorial is reviewed and ready.

## Languages

You do not need all 12 languages. If the visitor's language is missing, the page shows English (or Spanish)
with a notice. Start with `en.md` and `es.md`; the rest can be added later, one file at a time.

## Supported Markdown

Headings (`##`, `###`), **bold**, *italic*, `code`, code blocks, links, images, bullet and numbered lists
(one level of nesting), quotes (`>`, good for tips and warnings), tables and `---` separators.
HTML written inside the Markdown is shown as text, not executed.

## Writing a new tutorial in 3 steps

1. Create the folder: `content/tutorials/<category>/<slug>/`.
2. Add `en.md` and `es.md` with the header above and the content (keep `draft: true` while you write).
3. Run `npm run dev`, open `/tutorials` and check it. Then remove `draft: true` and commit.

## Planned tutorials

See `Tutorials.md` in the project root for the full list of topics.
