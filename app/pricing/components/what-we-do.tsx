import { Shield, Zap, Clock, Users } from "lucide-react";

export const WhatWeDo = () => {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
            What Happens When You Partner With Us
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Multi-Platform Monitoring
                </h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  We immediately begin scanning YouTube, X, TikTok, Instagram,
                  and other major platforms for unauthorized use of your
                  likeness or voice.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Custom AI Fine-Tuning
                </h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Our team trains specialized detection models on your unique
                  voice patterns, facial features, and mannerisms for maximum
                  accuracy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Real-Time Alerts</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Get instant notifications when potential deepfakes are
                  detected, with detailed analysis and confidence scores for
                  each finding.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Dedicated Support Team
                </h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  Your dedicated security team works to take down malicious
                  content and provides ongoing consultation on emerging threats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
