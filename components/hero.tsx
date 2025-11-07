import Link from "next/link";
import { instrumentSerif } from "@/lib/font";

export const Hero = () => {
  return (
    <section className="flex flex-col flex-1 justify-center items-center text-center px-4">
      <h1
        className={`text-5xl font-bold tracking-tight ${instrumentSerif.className}`}
      >
        Tech insights and creative stories, all in one place.
      </h1>
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
        Practical guides, deep dives, and notes from building real products.
      </p>
      <div className="mt-4">
        <Link
          href="/discover"
          className="inline-flex items-center rounded-md bg-green-600 text-white px-3 py-2 text-sm font-bold hover:bg-green-700 transition"
        >
          Start Reading
        </Link>
      </div>
    </section>
  );
};
