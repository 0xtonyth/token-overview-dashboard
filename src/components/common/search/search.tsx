"use client";

import { useState } from "react";

import SearchModal from "@/components/common/search/search-modal";

const Search = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="mx-auto mt-5 w-full font-[family-name:var(--font-geist-mono)]">
        <form className="focus-within:border-primary-medium bg-secondary_background relative mx-auto flex w-full items-center justify-between overflow-hidden rounded-xl border border-gray-700 shadow-md transition">
          <svg
            className="absolute left-2 block h-5 w-5 text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" className=""></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
          </svg>
          <input
            type="text"
            name="search"
            onClick={() => {
              setOpenModal(true);
            }}
            placeholder={`Search by token / pool address`}
            className="bg-secondary_background h-10 w-full rounded-xl py-4 pl-10 pr-4 text-gray-100 outline-none lg:pl-12 lg:pr-40"
          />
        </form>
        <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </>
  );
};

export default Search;
