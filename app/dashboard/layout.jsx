"use client";
import React from "react";
import { SignedIn } from "@clerk/nextjs";
import SideNav from "./_components/SideNav";
import Header from "../_components/Header";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function DashboardLayout({ children }) {
  const menuList = [
    {
      id: 1,
      name: "My From",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 1,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    
  ];
  const path = usePathname();
  useEffect(() => {
    // console.log(path);
  }, [path]);
  return (
    <SignedIn>
      <div>
        {/* <div className="md:w-64 fixed">
          {/* <SideNav /> 
          <div className="p-5">
            {menuList.map((menu, index) => (
              <div
                key={index}
                    className={`flex items-center gap-3 p-4 mb-3
                 hover:bg-primary hover:text-white rounded-lg
               cursor-pointer text-gray-500
                      ${path === menu.path && "bg-primary text-white"}
          `}
              >
                <menu.icon />
                {menu.name}
              </div>
            ))}
          </div>
        </div> */}
        <div>{children}</div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;
