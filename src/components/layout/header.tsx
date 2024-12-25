"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { useAccount, useConnect, useDisconnect } from "wagmi";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { shortenAddress } from "@/utils/shortenAddress";

import profilePicture from "/public/images/defaults/profile-picture.jpg";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <>
      <header className="mb-2 px-4 font-[family-name:var(--font-geist-mono)]">
        <div className="relative mx-auto flex max-w-screen-xl flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-extrabold">TOKEN DASHBOARD</p>
          <input className="peer hidden" type="checkbox" id="navbar-open" />
          <label
            className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.88em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="hidden py-6 pl-2 peer-checked:block sm:block sm:py-0"
          >
            <ul
              className={`mb-2 mt-2 flex flex-col gap-y-4 sm:flex-row ${isConnected ? "sm:gap-x-8" : "sm:gap-x-5"}`}
              // Temp conditional gap adjustment til Nav links changes to public
            >
              {isConnected ? (
                <>
                  <li className="-mt-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3 text-white">
                          <button
                            type="button"
                            className="bg-primary_foreground relative flex rounded-full text-sm focus:outline-none"
                            id="user-menu-button"
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                            onClick={toggleMenu}
                          >
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">User Menu</span>
                            <div className="flex flex-row">
                              <Image
                                className="h-10 w-10 rounded-full"
                                src={profilePicture}
                                alt="Profile picture"
                                width={32}
                                height={32}
                              />
                              <p className="mt-3 px-2 text-sm">
                                {shortenAddress(address as string, 5) || ""}
                              </p>
                            </div>
                          </button>

                          {isOpen && (
                            <div
                              ref={menuRef}
                              className="bg-primary_foreground absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu-button"
                            >
                              <div className="mt-3 flex flex-col items-center text-white">
                                <Image
                                  className="h-20 w-20 rounded-full border-2 border-gray-300"
                                  src={profilePicture}
                                  alt="Profile picture"
                                  width={32}
                                  height={32}
                                />
                                <p className="mt-2 text-sm">
                                  {shortenAddress(address as string, 8) || ""}
                                </p>
                              </div>
                              <a
                                // href="#"
                                className="mt-2 block cursor-pointer px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-blue-200 hover:text-black"
                                role="menuitem"
                                onClick={() => disconnect()}
                              >
                                Disconnect wallet
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <ConnectButton
                  chainStatus={"none"}
                  accountStatus={"avatar"}
                  showBalance={false}
                />
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
