import Navbar from "@/components/layout/Navbar";
import Container from "@/components/common/Container";
import TutorialsHero from "@/components/tutorials/TutorialsHero";
import TutorialsFilters from "@/components/tutorials/TutorialsFilters";

export default function TutorialsPage() {
    return (
        <>
            <main className="tutorials">
                <TutorialsHero />

                <section className="tutorials-content">
                    <Container>
                        <TutorialsFilters />

                        {/* Tutorials will go here */}
                    </Container>
                </section>
            </main>
        </>
    );
}