"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NoteProps {
  $id: string;
  title: string;
  note: string;
}

export default function Home() {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) {
          throw new Error("Response is not okay");
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        setError("Failed to fetch notes, please try reloading the page");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      setNotes((restNotes) => restNotes?.filter((i) => i.$id !== id));
    } catch (error) {
      setError("Failed to delete the note");
    }
  };

  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {notes.length === 0
            ? "There is no notes"
            : notes?.map((note) => (
                <div
                  key={note.$id}
                  className="p-4 my-2 rounded-md border-b leading-8"
                >
                  <div className="font-bold ">{note.title}</div>
                  <div>{note.note}</div>
                  <div className="flex gap-4 mt-4 justify-end ">
                    <Link
                      className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                      href={`/edit/${note.$id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="bg-red-500 text-white  px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                      onClick={() => handleDelete(note.$id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
