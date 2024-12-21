"use client";

import Link from "next/link";

import {
  FaDiscord as Discord,
  FaInstagram as Instagram,
  FaLinkedin as LinkedIn,
  FaTelegram as Telegram,
  FaXTwitter as X,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-white">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-gray-400 sm:flex-row sm:justify-between">
          <div className="flex h-full flex-col items-center justify-center gap-3 text-xs sm:flex-row sm:gap-5">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
              Token Dashboard
              <span className="font-semibold">
                © {currentYear} Token Dashboard
              </span>
            </div>
            <div className="flex flex-col gap-3 text-gray-400 sm:flex-row sm:gap-5">
              <Link
                className="transition duration-200 hover:text-primary"
                href={"/terms"}
                target="_blank"
              >
                Terms
              </Link>
              <Link
                className="transition duration-200 hover:text-primary"
                href={"/privacy"}
                target="_blank"
              >
                Privacy
              </Link>
              <Link
                className="transition duration-200 hover:text-primary"
                href={"/status"}
                target="_blank"
              >
                Status
              </Link>
              <Link
                className="transition duration-200 hover:text-primary"
                href={"/help"}
                target="_blank"
              >
                Help
              </Link>
              <Link
                className="transition duration-200 hover:text-primary"
                href={"/feedback"}
                target="_blank"
              >
                Feedback
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Link
              className="transition duration-200 hover:text-gray-600"
              href={"https://linkedin.com/company/tokendashboard"}
              target="_blank"
            >
              <LinkedIn size={"1.2rem"} />
            </Link>
            <Link
              className="transition duration-200 hover:text-gray-600"
              href={"https://x.com/tokendashboard"}
              target="_blank"
            >
              <X size="1.2rem" />
            </Link>
            <Link
              className="transition duration-200 hover:text-gray-600"
              href="https://discord.gg/tokendashboard"
              target="_blank"
            >
              <Discord size="1.2rem" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
