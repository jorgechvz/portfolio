import { Suspense } from "react";
import Navbar from "./components/header/navbar";
import LoadingExperience from "./components/loading/loading-experience";
import CanvasExperience from "./components/canvas/canvas-experience";
import ScrollExperience from "./components/scroll/scroll-experience";

function App() {
  return (
    <>
      <Navbar />
      <main className="relative w-full h-full">
        {/* Canvas 3D Experience */}
        <Suspense fallback={<LoadingExperience />}>
          <CanvasExperience />
        </Suspense>

        {/* Scroll-based Content Experience */}
        <Suspense fallback={<LoadingExperience />}>
          <ScrollExperience />
        </Suspense>
      </main>
    </>
  );
}

export default App;
