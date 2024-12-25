"use client";

import { useAccount } from "wagmi";

import Search from "@/components/common/search/search";

const Landing = () => {
  const { isConnected } = useAccount();

  return (
    <div className="bg-primary_background flex min-h-screen w-full items-start justify-start font-[family-name:var(--font-geist-mono)] text-base text-white">
      <div className="relative w-full">
        <div className="px-10 md:px-16 2xl:px-64">
          {!isConnected ? (
            <>
              <div className="flex h-[60vh] flex-col items-center justify-center">
                <h1 className="text-center text-2xl font-semibold">
                  Welcome to Token Dashboard!
                </h1>
                <p className="text-center text-sm font-light">
                  Connect your wallet to search tokens and pools by address to
                  get its overview dashboard.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-[60vh] flex-col items-center justify-center">
                <h1 className="text-center text-2xl font-semibold">
                  Welcome back to Token Dashboard!
                </h1>
                <p className="text-center text-sm font-light">
                  Search tokens and pools by address to get its overview
                  dashboard.
                </p>
                <div className="w-full max-w-2xl">
                  <Search />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
