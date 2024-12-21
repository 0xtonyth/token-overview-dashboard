"use client";

import { ThemeProvider } from "@/theme/theme-provider";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
