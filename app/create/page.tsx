"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const CreatePage = () => {
  const [formData, setFormDate] = useState({ title: "", note: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  //HANDLE INPUT
  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormDate((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.note) {
      setError("Please fill all the fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create the note");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      setError("something went wrong please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add new Note</h2>

      <form onSubmit={handleSubmit} action="" className="flex gap-3 flex-col">
        <input
          type="text"
          name="title"
          placeholder="Subject"
          className="py-1 px-4 border rounded-md"
          value={formData.title}
          onChange={inputHandler}
        />

        <textarea
          name="note"
          id=""
          rows={4}
          placeholder="Note"
          className="py-1 px-4 border rounded-md resize-none"
          value={formData.note}
          onChange={inputHandler}
        ></textarea>
        <button
          className="bg-black text-white mt-5  py-1 rounded-md cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding" : "Add Note"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreatePage;
