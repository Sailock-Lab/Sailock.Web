import TutorialsBrowser from "@/components/tutorials/TutorialsBrowser";
import { getAllTutorials } from "@/lib/tutorials";

// Los tutoriales se leen de content/tutorials al compilar la web.
export default function TutorialsPage() {
    return <TutorialsBrowser tutorials={getAllTutorials()} />;
}
