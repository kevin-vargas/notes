"use client";

import { useRef, useState } from "react";
import { createNote, type NotePayload } from "@/lib/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/ui/tags";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function CreateNoteForm() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  const {
    mutate,
    isPending,
    data: state,
  } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      if (data.message) {
        formRef.current?.reset();
        setTags([]);
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }
    },
  });

  const formAction = (formData: FormData) => {
    const payload: NotePayload = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tags: tags,
    };
    mutate(payload);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new note</CardTitle>
        <CardDescription>
          Fill out the form below to create a new note.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter you title"
            />
            {state?.errors?.title && (
              <div className="text-red-500 text-sm mt-1">
                {state.errors.title.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="tags">Tags</Label>
            <TagInput
              value={tags}
              onChange={setTags}
              placeholder="Enter your tags..."
            />
            {state?.errors?.tags && (
              <div className="text-red-500 text-sm mt-1">
                {state.errors.tags.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="content">Content</Label>
            <Textarea
              placeholder="Type your message here."
              id="content"
              name="content"
            />
            {state?.errors?.content && (
              <div className="text-red-500 text-sm mt-1">
                {state.errors.content.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating note..." : "Create Note"}
          </Button>
          {state?.message ? (
            <p className="text-green-500 text-sm mt-1">{state.message}</p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
