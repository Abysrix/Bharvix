"use client";

import { useState } from "react";
import Preloader from "@/components/layout/Preloader";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import StudioModel from "@/components/sections/StudioModel";
import Ambition from "@/components/sections/Ambition";
import Founders from "@/components/sections/Founders";
import Vision from "@/components/sections/Vision";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setStarted(true)} />

      {started && <Navigation />}

      <main>
        <Hero start={started} />
        <About />
        <StudioModel />
        <Ambition />
        <Founders />
        <Vision />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
