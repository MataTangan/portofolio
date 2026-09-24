import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCanvas from "@/components/ProjectCanvas";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Hero />
        <ProjectCanvas />
      </main>
      <Footer />
    </>
  );
}
