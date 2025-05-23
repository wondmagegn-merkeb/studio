
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Edit3 } from "lucide-react";

const personalizationFormSchema = z.object({
  recipientName: z.string().min(1, { message: "Recipient's name cannot be empty." }).max(50),
  senderName: z.string().min(1, { message: "Sender's name cannot be empty." }).max(50),
});

type PersonalizationFormValues = z.infer<typeof personalizationFormSchema>;

interface PersonalizationSectionProps {
  currentRecipientName: string;
  currentSenderName: string;
  onNamesUpdate: (data: PersonalizationFormValues) => void;
}

export default function PersonalizationSection({
  currentRecipientName,
  currentSenderName,
  onNamesUpdate,
}: PersonalizationSectionProps) {
  const form = useForm<PersonalizationFormValues>({
    resolver: zodResolver(personalizationFormSchema),
    defaultValues: {
      recipientName: currentRecipientName || "My Beautiful Girl",
      senderName: currentSenderName || "Your Loving Partner",
    },
    values: { // Ensure form updates if props change
        recipientName: currentRecipientName,
        senderName: currentSenderName,
    }
  });

  function onSubmit(data: PersonalizationFormValues) {
    onNamesUpdate(data);
    // Optionally, you could show a toast message here for success
  }

  return (
    <section id="personalize" className="py-12 px-4">
      <Card className="max-w-lg mx-auto shadow-lg rounded-xl bg-card/70 backdrop-blur-md border-primary/30">
        <CardHeader>
          <CardTitle className="text-3xl font-script text-primary flex items-center gap-2 justify-center">
            <Edit3 className="h-6 w-6" />
            Personalize Your Page
          </CardTitle>
          <CardDescription className="text-center text-card-foreground/80 pt-1">
            Update the names displayed on this page. Changes are saved in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., My Dearest Love" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the person this page is dedicated to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Your Adoring Partner" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your name as the sender.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                Save Names
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
