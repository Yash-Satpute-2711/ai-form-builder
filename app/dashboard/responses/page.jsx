"use client";
import React, { use, useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import { index, json } from "drizzle-orm/mysql-core";
import FormListItemReso from "./_components/FormListitemReso";

function Responses() {
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

  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && getFromList();
  }, [user]);

  const getFromList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress));

    setFormList(result);
    console.log(result);
  };

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
          Responses
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {formList.map((form, index) => (
            <FormListItemReso
              formRecord={form}
              jsonforms={JSON.parse(form.jsonfrom)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Responses;
