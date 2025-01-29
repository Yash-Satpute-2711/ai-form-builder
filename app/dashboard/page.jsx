"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import CreateFrom from "./_components/CreateFrom";
import FormList from "./_components/FormList";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
function Dashboard() {
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
    <div className="bg-white lg:p-10 md:p-5">
      <div className="p-5">
        <div className="flex items-center gap-3">
          {menuList.map((menu, index) => (
            <Link
              href={menu.path}
              key={index}
              className={`flex items-center gap-3 p-4 mb-3
                 hover:bg-primary hover:text-white rounded-lg
               cursor-pointer text-gray-500
                      ${path === menu.path && "bg-primary text-white"}
          `}
            >
              <menu.icon />

              {menu.name}
            </Link>
          ))}
        </div>
        <h2 className="text-3xl sm:grid-cols-1 md:grid-cols-2 font-bold flex justify-between items-center">
          Dashboard
          <CreateFrom />
        </h2>
        {/* List of From */}
        <FormList />
      </div>
    </div>
  );
}

export default Dashboard;
