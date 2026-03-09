'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Eye, EyeOff, Copy, RotateCcw } from 'lucide-react'

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [apiKey] = useState('your-api-key-here')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
  }

  return (

      <div className=" space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input
                id="name"
                defaultValue="John Doe"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john@example.com"
                className="bg-background border-border text-foreground"
              />
            </div>

            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* API Key Management */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">API Key</CardTitle>
            <CardDescription>Manage your API key for integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border">
              <span className="font-mono text-sm flex-1 text-foreground">
                {showApiKey ? apiKey : '•'.repeat(apiKey.length)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="text-muted-foreground hover:text-foreground"
              >
                <Copy size={16} />
              </Button>
            </div>
            <Button variant="outline" className="w-full gap-2">
              <RotateCcw size={16} />
              Regenerate API Key
            </Button>
            <p className="text-xs text-muted-foreground">
              Keep your API key secret. Never share it publicly or in client-side code.
            </p>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">Email Notifications</Label>
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
                <Label className="text-foreground font-medium">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Get a summary of your activity each week
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground font-medium">New Features</Label>
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
            <CardDescription>Account management options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <h4 className="font-semibold text-destructive mb-2">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

  )
}
