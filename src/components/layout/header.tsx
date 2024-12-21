"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { useAccount, useConnect, useDisconnect } from "wagmi";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();
  const router = useRouter();
  const { isConnected, address } = useAccount();

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
      <header className="mb-2 px-4 shadow">
        <div className="relative mx-auto flex max-w-screen-xl flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          Token Dashboard
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
              {isConnected && (
                <>
                  <li className="">
                    <Link
                      href="/"
                      className={`hover:text-primary ${pathname === "/" ? "text-primary" : "text-black"}`}
                    >
                      Home
                    </Link>
                  </li>
                </>
              )}
              {isConnected ? (
                <>
                  <li className="-mt-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                          <div>
                            <button
                              type="button"
                              className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white"
                              id="user-menu-button"
                              aria-expanded={isOpen}
                              aria-haspopup="true"
                              onClick={toggleMenu}
                            >
                              <span className="absolute -inset-1.5"></span>
                              <span className="sr-only">User Menu</span>
                              {/* <Image
                                  className="h-8 w-8 rounded-full"
                                  src={profilePicture || defaultProfilePicture}
                                  alt="Profile picture"
                                  width={32}
                                  height={32}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = defaultProfilePicture;
                                  }}
                                /> */}
                            </button>
                          </div>

                          {isOpen && (
                            <div
                              ref={menuRef}
                              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="user-menu-button"
                            >
                              <div className="flex flex-col items-center">
                                {/* <Image
                                    className="h-20 w-20 rounded-full"
                                    src={profilePicture || defaultProfilePicture}
                                    alt="Profile picture"
                                    width={32}
                                    height={32}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = defaultProfilePicture;
                                    }}
                                  /> */}
                                <p>{address}</p>
                              </div>

                              <a
                                href={`/`}
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
                                role="menuitem"
                              >
                                Profile
                              </a>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black"
                                role="menuitem"
                              >
                                Settings
                              </a>
                              {/* <a
                                  // href="#"
                                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black cursor-pointer"
                                  role="menuitem"
                                  onClick={signOut}
                                >
                                  Sign out
                                </a> */}
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
