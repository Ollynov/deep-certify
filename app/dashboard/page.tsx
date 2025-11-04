import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/server";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Video,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MediaUpload } from "@/components/media-upload";

type VideoItem = {
  id: number;
  title: string;
  thumbnail: string;
  date: string;
  confidence: number;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  // Empty state - videos will be populated when user uploads content
  const videos: {
    real: VideoItem[];
    fake: VideoItem[];
    unsure: VideoItem[];
  } = {
    real: [],
    fake: [],
    unsure: [],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-primary/20 bg-card/50 backdrop-blur-sm p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Deep Certify</span>
        </div>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
          >
            <Video className="h-4 w-4" />
            <span className="text-sm font-medium">Videos</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-primary/20 pt-4">
            <p className="text-xs text-muted-foreground mb-2">
              {data.user.email}
            </p>
            <form action="/auth/signout" method="post">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">
              Media Certification
            </h1>
            <p className="text-muted-foreground">
              Analyze and certify the authenticity of images, audio, and videos
            </p>
          </div>

          {/* Upload Section */}
          <MediaUpload />

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Verified Real
                </h3>
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{videos.real.length}</p>
            </div>
            <div className="rounded-lg border border-destructive/20 bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Detected Fake
                </h3>
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-3xl font-bold">{videos.fake.length}</p>
            </div>
            <div className="rounded-lg border border-yellow-500/20 bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Under Review
                </h3>
                <HelpCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold">{videos.unsure.length}</p>
            </div>
          </div>

          {/* Video Categories */}
          <div className="space-y-8">
            {/* Real Videos */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Verified Real</h2>
                <span className="text-sm text-muted-foreground">
                  ({videos.real.length})
                </span>
              </div>
              {videos.real.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-primary/20 bg-card/50 p-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    No verified videos yet. Upload a video to get started.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {videos.real.map((video) => (
                    <div
                      key={video.id}
                      className="rounded-lg border border-primary/20 bg-card overflow-hidden hover:border-primary/40 transition-colors"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{video.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {video.date}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary font-medium">
                            {video.confidence}% Confidence
                          </span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Fake Videos */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 className="text-xl font-semibold">Detected Deepfakes</h2>
                <span className="text-sm text-muted-foreground">
                  ({videos.fake.length})
                </span>
              </div>
              {videos.fake.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-destructive/20 bg-card/50 p-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    No deepfakes detected yet.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {videos.fake.map((video) => (
                    <div
                      key={video.id}
                      className="rounded-lg border border-destructive/20 bg-card overflow-hidden hover:border-destructive/40 transition-colors"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{video.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {video.date}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-destructive font-medium">
                            {video.confidence}% Fake
                          </span>
                          <Button size="sm" variant="outline">
                            View Analysis
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Unsure Videos */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-yellow-500" />
                <h2 className="text-xl font-semibold">Under Review</h2>
                <span className="text-sm text-muted-foreground">
                  ({videos.unsure.length})
                </span>
              </div>
              {videos.unsure.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-yellow-500/20 bg-card/50 p-12 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">
                    No videos under review.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {videos.unsure.map((video) => (
                    <div
                      key={video.id}
                      className="rounded-lg border border-yellow-500/20 bg-card overflow-hidden hover:border-yellow-500/40 transition-colors"
                    >
                      <div className="relative w-full h-48">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{video.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {video.date}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-yellow-500 font-medium">
                            {video.confidence}% Uncertain
                          </span>
                          <Button size="sm" variant="outline">
                            Re-analyze
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
