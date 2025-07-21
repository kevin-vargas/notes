"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string().min(1)).optional()
});

export type NotePayload = z.infer<typeof createNoteSchema>;

export type State = {
  errors?: {
    title?: string[];
    content?: string[];
    tags?: string[];
  };
  message?: string;
};

export async function createNote(payload: NotePayload): Promise<State> {
  const validatedFields = createNoteSchema.safeParse(payload);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await prisma.note.create({
    data: {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      tags: {
        connectOrCreate: validatedFields.data.tags?.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })) ?? [],
      },
    },
  });

  return {
    message: "Note created successfully",
  };
}

export async function getNotes() {
  const notes = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return notes;
}
