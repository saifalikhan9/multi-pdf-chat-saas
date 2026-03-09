"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const [emailNotifications, setEmailNotifications] = useState(true)

  if (status === "loading") {
    return <div className="p-8">Loading...</div>
  }

  if (!session) {
    return <div className="p-8">You must be logged in to view settings.</div>
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* User ID */}
          <div className="space-y-2">
            <Label className="text-foreground">User ID</Label>
            <Input
              value={session.user.id}
              readOnly
              className="bg-background border-border text-foreground"
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <Input
              id="name"
              defaultValue={session.user.name ?? ""}
              className="bg-background border-border text-foreground"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={session.user.email ?? ""}
              className="bg-background border-border text-foreground"
            />
          </div>

          <Button className="w-full">
            Save Changes
          </Button>

        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground font-medium">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive updates about your chats and documents
              </p>
            </div>

            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground font-medium">
                Weekly Digest
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get a summary of your activity each week
              </p>
            </div>

            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-foreground font-medium">
                New Features
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Be notified about new features and updates
              </p>
            </div>

            <Switch defaultChecked />
          </div>

        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Account</CardTitle>
          <CardDescription>
            Account management options
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h4 className="font-semibold text-destructive mb-2">
              Danger Zone
            </h4>

            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back.
              Please be certain.
            </p>

            <Button
              variant="outline"
              className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}