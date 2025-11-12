import { upcomingLaunch } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Launch Announcement</CardTitle>
          <CardDescription>
            Control the announcement banner on the homepage for the next product drop.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="launch-name">Launch Name</Label>
              <Input id="launch-name" defaultValue={upcomingLaunch.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-date">Launch Date Text</Label>
              <Input id="launch-date" defaultValue={upcomingLaunch.date} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-description">Launch Description</Label>
              <Textarea
                id="launch-description"
                defaultValue={upcomingLaunch.description}
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit">Save Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
