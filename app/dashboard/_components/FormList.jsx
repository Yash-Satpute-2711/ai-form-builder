"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/clerk-react";
import { desc, eq } from "drizzle-orm";
import { index, json } from "drizzle-orm/mysql-core";

import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  useEffect(() => {
    user && GetFormList();
  }, [user]);
  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));
    setFormList(result);
    console.log(result);
  };

  return (
    <div>
      <div className="mt-5 grid grid-cols-2  md:grid-cols-3 gap-5">
        {formList.map((form, index) => (
          <div>
            <FormListItem
              jsonforms={JSON.parse(form.jsonfrom)}
              formRecord={form}
              refreshData={GetFormList}
            />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default FormList;
