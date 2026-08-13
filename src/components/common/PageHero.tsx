import Container from "@/components/common/Container";

interface PageHeroProps {
    title: string;
    description?: string;
}

export default function PageHero({
    title,
    description,
}: PageHeroProps) {
    return (
        <section className="page-hero">
            <Container>
                <div className="page-hero-content">
                    <h1>{title}</h1>

                    {description && (
                        <p>{description}</p>
                    )}
                </div>
            </Container>
        </section>
    );
}