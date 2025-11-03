import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PricingTiers = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight">
          Choose Your Protection Level
        </h2>
        <p className="mb-12 text-center text-lg text-muted-foreground">
          All plans include our core monitoring and detection technology
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Basic Plan */}
          <div className="flex flex-col rounded-lg border border-border/40 bg-card p-8">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold">Basic</h3>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Essential protection for individuals and small creators
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">1 persona protected</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">YouTube + X monitoring</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">24-hour response time</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Email support</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Monthly reports</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="#contact">Get Started</Link>
            </Button>
          </div>

          {/* Pro Plan - Featured */}
          <div className="relative flex flex-col rounded-lg border-2 border-primary bg-card p-8 shadow-lg">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
              Most Popular
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold">Pro</h3>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">$999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Comprehensive protection for professionals and public figures
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">1 persona protected</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">All major platforms monitored</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">6-hour response time</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Weekly reports</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Advanced analytics dashboard</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Takedown assistance</span>
              </li>
            </ul>

            <Button className="w-full" asChild>
              <Link href="#contact">Get Started</Link>
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col rounded-lg border border-border/40 bg-card p-8">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-bold">Enterprise</h3>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">$5,000+</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                Maximum protection for organizations and high-profile
                individuals
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Multiple personas protected</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Global platform monitoring</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Instant alerts</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Dedicated support team</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Custom fine-tuning</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Real-time dashboard</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">Legal support coordination</span>
              </li>
              <li className="flex gap-3">
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">API access</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="#contact">Contact Sales</Link>
            </Button>
          </div>
        </div>

        {/* Government/Celebrity Tier */}
        <div className="mt-8 rounded-lg border border-primary/40 bg-primary/5 p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-2xl font-bold">
                Government & Celebrity Protection
              </h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                Custom solutions for high-risk individuals and government
                entities requiring maximum security and rapid response
                capabilities.
              </p>
            </div>
            <Button size="lg" className="shrink-0" asChild>
              <Link href="#contact">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
