"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { MdClose as Close } from "react-icons/md";

import { axiosInstance } from "@/libs/axios/axiosInstance";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type AddressSearchResult = {
  type: string;
  attributes: {
    address?: string;
    name?: string;
    symbol?: string;
    image_url?: string;
  };
};

const SearchModal = ({ openModal, setOpenModal }: Props) => {
  const router = useRouter();

  const [copied, setCopied] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<AddressSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("tokens");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const GECKOTERMINAL_API_URL = process.env.NEXT_PUBLIC_GECKOTERMINAL_API_URL;

  const NETWORK = "eth";

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value.trim();

    if (searchTerm.length) {
      setIsSearching(true);

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(async () => {
        try {
          const response = await axiosInstance.get(
            `${GECKOTERMINAL_API_URL}/networks/${NETWORK}/${selectedOption}/${searchTerm}`
          );

          if (response.status === 200) {
            const searchResponse = response.data.data;
            setSearchResults([searchResponse]);
          } else {
            console.log(`Error ${response.status}`);
            setSearchResults([]);
          }
        } catch (error: any) {
          setSearchResults([]);
          if (error.response) {
            console.log("Error searching token or pool:", error.response.data);
          } else {
            console.log("Error searching token or pool:", error.message);
          }
        }

        setIsSearching(false);
      }, 1000);

      setDebounceTimeout(timeout);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  /* const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${tokens}/ethereum/${address}`);

      addToast({
        type: "success",
        message: `Copied link to clipboard`,
      });

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (error: any) {
      if (error.response) {
        console.log("Error copying link to clipboard:", error.response.data);
        addToast({
          type: "error",
          message: "Failed to copy link. Please try again!",
        });
      } else {
        console.log("Error copying link to clipboard:", error.message);
        addToast({
          type: "error",
          message: "Failed to copy link. Please try again!",
        });
      }
    }
  }; */

  useEffect(() => {
    setSearchResults([]);
  }, [openModal]);

  return (
    <>
      <Dialog
        className="relative z-10 p-5 font-[family-name:var(--font-geist-mono)]"
        open={openModal}
        onClose={setOpenModal}
      >
        <DialogBackdrop
          transition
          className="bg-secondary_background fixed inset-0 bg-opacity-75 transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              // style={{ maxWidth: "70vw", width: "70vw" }}
              transition
              className="bg-primary_foreground relative min-h-[320px] w-full transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:max-w-3xl lg:max-w-4xl xl:max-w-6xl"
            >
              <div
                className="absolute right-4 mt-4 cursor-pointer self-end p-1"
                onClick={() => setOpenModal(false)}
              >
                <Close size={"1.25rem"} />
              </div>
              <div className="bg-primary_foreground px-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex flex-col items-start gap-4">
                  <div className="mt-4 text-left">
                    <DialogTitle
                      as="h1"
                      className="text-xl font-medium text-white"
                    >
                      SEARCH TOKENS & POOLS
                    </DialogTitle>
                  </div>
                  <div className="mx-auto mt-5 flex w-full flex-row gap-3">
                    <select
                      className="bg-primary_background rounded-lg px-3 py-2 text-white shadow-sm outline-none"
                      name="options"
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      <option className="outline-none" value="tokens">
                        TOKENS
                      </option>
                      <option className="outline-none" value="pools">
                        POOLS
                      </option>
                    </select>
                    <form className="focus-within:border-primary-medium relative mx-auto flex w-full items-center justify-between overflow-hidden rounded-xl border border-gray-300 bg-gray-300 shadow-md transition">
                      <svg
                        className="absolute left-2 block h-5 w-5 text-gray-700"
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
                        <line
                          x1="21"
                          y1="21"
                          x2="16.65"
                          y2="16.65"
                          className=""
                        ></line>
                      </svg>
                      <input
                        type="text"
                        name="search"
                        // value={query}
                        onChange={handleSearchChange}
                        placeholder={`Search by ${selectedOption} address`}
                        className="h-10 w-full rounded-xl bg-gray-300 py-4 pl-10 pr-4 text-black outline-none lg:pl-12 lg:pr-40"
                      />
                    </form>
                  </div>
                  {!isSearching ? (
                    <>
                      {searchResults.length ? (
                        <>
                          <div className="bg-secondary_foreground w-full rounded-lg px-3 py-2 text-black transition-all duration-200 hover:shadow-lg">
                            <Link
                              href={`/${searchResults[0].type === "token" ? "tokens" : "pools"}/ethereum/${searchResults[0].attributes.address}`}
                              // target="_blank"
                            >
                              <div className="flex flex-row items-center gap-2">
                                {searchResults[0].attributes.image_url ? (
                                  <Image
                                    // className="dark:invert"
                                    src={searchResults[0].attributes.image_url!}
                                    alt={searchResults[0].attributes.symbol!}
                                    width={28}
                                    height={28}
                                    priority
                                  />
                                ) : null}
                                <p className="text-sm font-bold">
                                  {searchResults[0].attributes.symbol}
                                </p>
                                <p className="text-sm font-medium">
                                  {searchResults[0].attributes.name}
                                </p>
                              </div>
                            </Link>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <div className="flex w-full items-center justify-center">
                        <svg
                          className="h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="xMidYMid"
                        >
                          <circle
                            cx="50"
                            cy="50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="10"
                            r="35"
                            strokeDasharray="164.93361431346415 56.97787143782138"
                            // opacity="0.5"
                          >
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              repeatCount="indefinite"
                              dur="1s"
                              values="0 50 50;360 50 50"
                              keyTimes="0;1"
                            ></animateTransform>
                          </circle>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SearchModal;
