import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Note Creating
async function createNote(data: { term: string; note: string }) {
  try {
    const response = await database.createDocument(
      process.env.APPRWRITE_DB as string,
      "notes",
      ID.unique(),
      data
    );

    return response;
  } catch (error) {
    console.error("Error on creating new Note", error);
    throw new Error("Failed to create a note");
  }
}

// Fetch Notes

async function fetchNotes() {
  try {
    const response = await database.listDocuments(
      process.env.APPRWRITE_DB as string,
      "notes",
      [Query.orderDesc("$createdAt")]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching notes", error);
    throw new Error("Failed to fetch notes");
  }
}

// post request
export async function POST(req: Request) {
  try {
    const { term, note } = await req.json();
    const data = { term, note };
    const response = await createNote(data);
    return NextResponse.json({ message: "Notes created" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to creat note" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const notes = await fetchNotes();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch notes",
      },
      { status: 500 }
    );
  }
}
