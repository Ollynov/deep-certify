import { Header } from "./../components/header";
import { Footer } from "../components/footer";
import { Button } from "@/components/ui/button";
import { Check, Shield, Zap, Clock, Users } from "lucide-react";
import Link from "next/link";
import { PricingTiers } from "./components/pricing-tiers";
import { WhatWeDo } from "./components/what-we-do";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Protection That Works{" "}
              <span className="text-primary">Around the Clock</span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              When you partner with Deep Certify, we immediately deploy our full
              suite of monitoring, detection, and response systems to protect
              your digital identity.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <PricingTiers />

        {/* What We Do Section */}
        <WhatWeDo />

        {/* CTA Section */}
        <section className="border-t border-border/40 bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Ready to Protect Your Identity?
              </h2>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                Join hundreds of creators, professionals, and organizations who
                trust Deep Certify to safeguard their digital presence.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="#contact">Start Free Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
