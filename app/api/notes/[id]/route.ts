import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchNote(id: string) {
  try {
    const note = await database.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COLLECTION_ID as string,
      id
    );

    return note;
  } catch (error) {
    console.error("Failed fetching the note", error);
    throw new Error("Failed to fetch note");
  }
}

// Delete speicific note
async function deleteNote(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COLLECTION_ID as string,
      id
    );
    return response;
  } catch (error) {
    console.error("Error deleting the note", error);
    throw new Error("Failed to delete the note");
  }
}

// Update specific Note
async function updateNote(id: string, data: { title: string; note: string }) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COLLECTION_ID as string,
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Failed to update the note", error);
  }
}

// GET
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const note = await fetchNote(id);
    return NextResponse.json({ note });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch note",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await deleteNote(id);
    return NextResponse.json({ message: "Note deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed deleting the Note" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const note = await req.json();
    await updateNote(id, note);
    return NextResponse.json({ message: "Note Updated" });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update the Note",
      },
      { status: 500 }
    );
  }
}
