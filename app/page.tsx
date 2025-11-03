import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Footer } from "./components/footer";
import { ImageComparisonSlider } from "./components/image-slider";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ImageComparisonSlider />
      </main>
      <Footer />
    </div>
  );
}
