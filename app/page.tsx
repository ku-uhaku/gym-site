import About from "./_components/about";
import Contact from "./_components/contact";
import Equipment from "./_components/equipment";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Photos from "./_components/photos";
import Services from "./_components/services";
import SnapPacer from "./_components/snap-pacer";

export default function Home() {
  return (
    <>
      <SnapPacer />
      <Hero />
      <About />
      <Equipment />
      <Services />
      <Photos />
      <Contact />
      <Footer />
    </>
  );
}
