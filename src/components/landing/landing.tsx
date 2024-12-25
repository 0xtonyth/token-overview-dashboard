"use client";

import Image from "next/image";

import Search from "@/components/common/search/search";

const Landing = () => {
  return (
    <div className="bg-primary_background flex min-h-screen w-full items-start justify-start font-[family-name:var(--font-geist-mono)] text-base text-white">
      <div className="relative w-full">
        <div className="px-10 md:px-16 2xl:px-64">
          <div className="max-w-2xl">
            <Search />
          </div>
          <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
            <li className="mb-2">
              Get started by editing{" "}
              <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
                app/page.tsx
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Landing;
