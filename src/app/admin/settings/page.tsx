
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDoc, useFirebase, useMemoFirebase } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { LaunchSchedule, HeroSection } from "@/lib/types";
import { doc, setDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isHeroPending, startHeroTransition] = useTransition();

  // Access Code State
  const launchScheduleRef = useMemoFirebase(() => {
    if(!firestore) return null;
    return doc(firestore, "launchSchedules/main-launch");
  }, [firestore]);

  const { data: launchSchedule, isLoading: isScheduleLoading } = useDoc<LaunchSchedule>(launchScheduleRef);
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    if (launchSchedule) {
      setAccessCode(launchSchedule.accessCode || "");
    }
  }, [launchSchedule]);

  const handleAccessCodeSave = () => {
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

  // Hero Section State
  const heroContentRef = useMemoFirebase(() => {
    if(!firestore) return null;
    return doc(firestore, "siteSettings/hero");
  }, [firestore]);
  
  const { data: heroData, isLoading: isHeroLoading } = useDoc<HeroSection>(heroContentRef);

  const [badgeText, setBadgeText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    if (heroData) {
      setBadgeText(heroData.badgeText || "");
      setTitle(heroData.title || "");
      setDescription(heroData.description || "");
    }
  }, [heroData]);

  const handleHeroContentSave = () => {
    if(!firestore) return;
    
    startHeroTransition(async () => {
      try {
        const heroContent = {
          badgeText,
          title,
          description,
        };

        await setDoc(doc(firestore, "siteSettings", "hero"), heroContent, { merge: true });
        
        toast({
          title: "Hero Content Saved",
          description: "The homepage hero section has been updated.",
        });
      } catch (error) {
        console.error("Failed to save hero content:", error);
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: "Could not save hero content at this time.",
        });
      }
    });
  };


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">Settings</h1>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Drop Access</CardTitle>
            <CardDescription>
              Set the password required to access the upcoming products page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isScheduleLoading ? (
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
                <Button onClick={handleAccessCodeSave} disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Access Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Section Content</CardTitle>
            <CardDescription>
              Edit the content displayed in the hero section of the homepage.
            </CardDescription>
          </CardHeader>
          <CardContent>
             {isHeroLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <span>Loading Hero Content...</span>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="badge-text">Badge Text</Label>
                  <Input 
                    id="badge-text" 
                    type="text"
                    placeholder="e.g., LAUNCHING SOON"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)} 
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="hero-title">Title</Label>
                  <Input 
                    id="hero-title" 
                    type="text"
                    placeholder="e.g., Drop 02: Quantum Dharma"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="hero-description">Description</Label>
                   <Textarea
                    id="hero-description"
                    placeholder="Enter the hero section description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button onClick={handleHeroContentSave} disabled={isHeroPending}>
                  {isHeroPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Hero Content
                </Button>
              </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
