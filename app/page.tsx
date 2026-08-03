import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { Hero } from '@/components/sections/hero';
import { Portals } from '@/components/sections/portals';
import { Features } from '@/components/sections/features';
import { AIModules } from '@/components/sections/ai-modules';
import { Stats } from '@/components/sections/stats';
import { Testimonials } from '@/components/sections/testimonials';
import { Pricing } from '@/components/sections/pricing';
import { CTA } from '@/components/sections/cta';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Portals />
        <Features />
        <AIModules />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
