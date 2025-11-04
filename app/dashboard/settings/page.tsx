import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/server";
import { Button } from "@/app/components/ui/button";
import {
  Shield,
  Video,
  Settings,
  LogOut,
  User,
  Bell,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

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
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Video className="h-4 w-4" />
            <span className="text-sm font-medium">Videos</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Profile</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">{data.user.email}</p>
                </div>
                <Button variant="outline" size="sm">
                  Update Profile
                </Button>
              </div>
            </div>

            {/* Security Section */}
            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Security</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Password</p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Two-Factor Authentication
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    Enable 2FA (Coming Soon)
                  </Button>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Notifications</h2>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Email notification preferences (Coming Soon)
                </p>
                <Button variant="outline" size="sm" disabled>
                  Configure Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
