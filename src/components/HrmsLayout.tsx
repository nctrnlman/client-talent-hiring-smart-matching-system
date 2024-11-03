// src/components/Layout.tsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface HrmsLayoutProps {
  children: React.ReactNode;
}

const HrmsLayout: React.FC<HrmsLayoutProps> = ({ children }) => {
  return (
    <div className="layout flex flex-col min-h-screen">
      <header className="header bg-white border-b-2  p-4 ">
        <Topbar />
      </header>
      <div className="flex flex-grow">
        <aside className="sidebar w-64 bg-white text-black p-4 border-r-2 transition-transform duration-200 ease-in-out transform flex-shrink-0">
          <Sidebar />
        </aside>
        <main className="content flex-grow p-6 bg-lightPrimary overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HrmsLayout;
