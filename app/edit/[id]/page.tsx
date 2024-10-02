"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const EditPage = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState({ title: "", note: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/notes/${params.id}`);
        if (!response.ok) {
          throw new Error("Response is not okay");
        }
        const data = await response.json();
        setFormData({
          title: data.note.title,
          note: data.note.note,
        });
      } catch (error) {
        console.error("Failed to fetch the data", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const updateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.note) {
      setError("Please fill all the fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/notes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the note");
      }

      router.push("/");
    } catch (error) {
      console.error("Failed to update the note", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Edit Note</h2>

      <form onSubmit={updateSubmit} action="" className="flex gap-3 flex-col">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Subject"
          className="py-1 px-4 border rounded-md"
        />

        <textarea
          name="note"
          value={formData?.note}
          onChange={handleInputChange}
          id=""
          placeholder="Note"
          className="py-1 px-4 border rounded-md resize-none"
        ></textarea>
        <button className="bg-black text-white mt-5  py-1 rounded-md cursor-pointer">
          {isLoading ? "Updating..." : "Update the note"}
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default EditPage;
