// src/components/CareerLayout.tsx
import React from "react";
import CareerNavbar from "./CareerNavbar";

interface CareerLayoutProps {
  children: React.ReactNode;
}

const CareerLayout: React.FC<CareerLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <CareerNavbar />
      <main className="p-6 bg-lightPrimary">{children}</main>
    </div>
  );
};

export default CareerLayout;
