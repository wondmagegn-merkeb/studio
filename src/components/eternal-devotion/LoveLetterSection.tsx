
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateLoveLetter, type GenerateLoveLetterInput } from '@/ai/flows/generate-love-letter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Wand2 } from 'lucide-react';

const formSchema = z.object({
  recipientName: z.string().min(1, "Recipient's name is required."),
  senderName: z.string().min(1, "Your name is required."),
  relationshipDetails: z.string().min(10, "Please share some details (at least 10 characters)."),
  tone: z.enum(['romantic', 'playful', 'serious', 'affectionate']),
});

type FormData = z.infer<typeof formSchema>;

const LoveLetterSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      senderName: '',
      relationshipDetails: '',
      tone: 'romantic',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedLetter(null);
    try {
      const result = await generateLoveLetter(data as GenerateLoveLetterInput);
      setGeneratedLetter(result.loveLetter);
      setIsModalOpen(true);
      toast({
        title: "💖 Love Letter Generated!",
        description: "Your heartfelt message is ready.",
      });
    } catch (error) {
      console.error("Error generating love letter:", error);
      toast({
        title: "😔 Oh no!",
        description: "Something went wrong while crafting your letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 text-center">
      <Card className="max-w-2xl mx-auto shadow-xl rounded-xl bg-white/50 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-script text-primary flex items-center justify-center gap-2">
            <Wand2 className="h-8 w-8" /> Create a Love Letter
          </CardTitle>
          <CardDescription className="text-foreground/80">
            Let our AI help you express your deepest feelings. Fill in the details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To My Dearest:</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., My Love, Sweetheart" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="senderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Your Adorer:</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Your Secret Admirer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="relationshipDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Our Special Story:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share a cherished memory, what you love about them, or a funny moment..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set the Mood:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="romantic">Romantic & Passionate</SelectItem>
                        <SelectItem value="playful">Playful & Lighthearted</SelectItem>
                        <SelectItem value="serious">Serious & Sincere</SelectItem>
                        <SelectItem value="affectionate">Warm & Affectionate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full shadow-md hover:shadow-lg transition-shadow">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Crafting Your Message...' : 'Generate Love Letter'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedLetter && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl bg-card text-card-foreground shadow-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-3xl font-script text-primary">Your Love Letter 💌</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                A message straight from the heart, with a little help from AI.
              </DialogDescription>
            </DialogHeader>
            <div className="prose prose-sm sm:prose-base max-h-[60vh] overflow-y-auto p-4 my-4 bg-background/50 rounded-md whitespace-pre-wrap font-sans text-card-foreground">
              {generatedLetter}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default LoveLetterSection;
