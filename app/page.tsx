/** @format */

import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import FeaturesAccordion from '@/components/FeaturesAccordion';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Headline from '@/components/Headline';
import Copy from '@/components/Copy';
import Copy2 from '@/components/Copy2';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        {/* <Copy2 /> */}
        <Headline />
        <Copy />
      </main>
      <Footer />
    </>
  );
}
