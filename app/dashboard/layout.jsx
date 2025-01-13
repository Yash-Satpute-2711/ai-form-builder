"use client";
import React from "react";
import { SignedIn } from "@clerk/nextjs";
import SideNav from "./_components/SideNav";
import Header from "../_components/Header";

function DashboardLayout({ children }) {
  return (
    <SignedIn>
      <div>
        <div className="md:w-64 fixed">
          <SideNav />
        </div>
        <div className="md:ml-64">{children}</div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;
