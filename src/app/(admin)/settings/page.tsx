'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDoc, useFirebase, useMemoFirebase } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { LaunchSchedule } from "@/lib/types";
import { doc, setDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";


export default function AdminSettingsPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const launchScheduleRef = useMemoFirebase(() => {
    if(!firestore) return null;
    return doc(firestore, "launchSchedules/main-launch");
  }, [firestore]);

  const { data: launchSchedule, isLoading } = useDoc<LaunchSchedule>(launchScheduleRef);
  
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    if (launchSchedule) {
      setAccessCode(launchSchedule.accessCode || "");
    }
  }, [launchSchedule]);


  const handleSave = () => {
    if (!firestore) return;

    startTransition(async () => {
      try {
        const scheduleData = {
          id: 'main-launch',
          description: 'Main upcoming product launch schedule.',
          accessCode: accessCode,
        };

        await setDoc(doc(firestore, "launchSchedules", "main-launch"), scheduleData, { merge: true });

        toast({
          title: "Settings Saved",
          description: "The access code has been updated successfully.",
        });

      } catch (error) {
        console.error("Failed to save settings:", error);
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: "Could not save settings at this time.",
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Drop Access</CardTitle>
          <CardDescription>
            Set the password required to access the upcoming products page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="mr-2 h-8 w-8 animate-spin" />
              <span>Loading Settings...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="access-code">Access Password</Label>
                <Input 
                  id="access-code" 
                  type="text"
                  placeholder="Enter a password for the upcoming drop"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)} 
                />
                <p className="text-sm text-muted-foreground">
                  Customers will need to enter this password to view the upcoming products page.
                </p>
              </div>
              <Button onClick={handleSave} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Settings
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
