import Notes from "@/components/notes";
import { CreateNoteForm } from "@/components/create-note-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Quick Notes</h1>
          <p className="text-muted-foreground">
            A simple app to create and view notes.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="md:col-span-1">
            <CreateNoteForm />
          </div>
          <div className="md:col-span-1">
            <Notes />
          </div>
        </div>
      </div>
    </main>
  );
}
