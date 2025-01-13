import React from "react";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
function SideNav() {
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
    // {
    //   id: 1,
    //   name: "Analytics",
    //   icon: LineChart,
    //   path: "/dashboard/analytics",
    // },
    // {
    //   id: 1,
    //   name: "Upgrade",
    //   icon: Shield,
    //   path: "/dashboard/upgrade",
    // },
  ];
  const path = usePathname();
  useEffect(() => {
    // console.log(path);
  }, [path]);
  return (
    <div style={{height:"100vh"}} className=" shadow-md border bg-white">
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
    
        <div className="fixed bottom-7 p-6 w-64">
          <Button className=" w-full">+ Create From</Button>
          {/* <div className="my-7">
            <Progress value={33} />
            <h2 className="text-sm mt-2 text-gray-600">
              <strong>2 </strong> Out of <strong>3</strong> File Created
            </h2>
            <h2 className="text-sm mt-3 text-gray-600">
              Upgrade your plan for unlimted AI form build
            </h2>
          </div> */}
       
      </div>
    </div>
  );
}

export default SideNav;
