import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next JS CRUD - Note App",
  description: "Next JS, Appwrite, CRUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-3xl mx-auto text-slate-800">
          <header className="p-6 border-b flex justify-between bg-blue-500 rounded-bl-lg rounded-br-lg items-center">
            <Link className="text-2xl font-bold text-white" href={"/"}>
              Tech Interpretation
            </Link>
            <Link
              className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md"
              href={"/create"}
            >
              Create New{" "}
            </Link>
          </header>
          <main className="p-4 text-lg">{children}</main>
        </div>
      </body>
    </html>
  );
}
