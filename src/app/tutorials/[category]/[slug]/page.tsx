import TutorialArticle from "@/components/tutorials/TutorialArticle";
import { getAllTutorials, getTutorial } from "@/lib/tutorials";

// Con output "export" todas las páginas se generan al compilar: una por tutorial.
export const dynamicParams = false;

export function generateStaticParams() {
    const params = getAllTutorials().map((tutorial) => ({
        category: tutorial.dir,
        slug: tutorial.slug,
    }));

    // Si todavía no hay tutoriales publicados, se genera una página de marcador para que la compilación no falle.
    return params.length > 0 ? params : [{ category: "first-steps", slug: "coming-soon" }];
}

export default async function TutorialPage({
    params,
}: {
    params: Promise<{ category: string; slug: string }>;
}) {
    const { category, slug } = await params;
    return <TutorialArticle article={getTutorial(category, slug) ?? null} />;
}
