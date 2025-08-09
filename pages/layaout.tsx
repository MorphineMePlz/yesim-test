import { Header, HorizontalScroll } from "@/components";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">
        {children}
        <HorizontalScroll />
      </main>
    </>
  );
};

export default Layout;
