"use client";
import FromUi from "@/app/edit-from/[fromId]/_components/FromUi";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function LiveAiForm({ params }) {
  const [record, setRecord] = useState();
  const [jsonFrom, setJsonFrom] = useState([]);
  useEffect(() => {
    params && GetFromData();
  }, [params]);
  const GetFromData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, Number(params?.formid)));

    setRecord(result[0]);
    setJsonFrom(JSON.parse(result[0].jsonfrom));
    console.log(result);
  };
  return (
    <div
      className="p-10 flex justify-center items-center shadow-2xl"
      style={{ background: record?.background }}
    >
      {record && (
        <FromUi
          className="shadow-2xl"
          jsonFrom={jsonFrom}
          onFieldUpdate={() => console.log}
          deleteField={() => console.log}
          selectedTheme={record?.theme}
          editable={false}
          formId={record.id}
        />
      )}
      <Link
        className="flex items-center gap-2 bg-black px-3 text-white p-2 rounded-full fixed bottom-10 left-10 cursor-pointer"
        href={process.env.NEXT_PUBLIC_BASE_URL}
      >
        <Image
          src={"/settinglogo.svg"}
          alt="logo"
          width={30}
          height={30}
        ></Image>
        Build your own AI form
      </Link>
    </div>
  );
}

export default LiveAiForm;
