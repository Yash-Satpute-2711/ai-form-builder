"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, Share, Share2, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import FromUi from "../_components/FromUi";
import { fromJSON } from "postcss";
import FromUi from "./_components/FromUi";
import { toast } from "sonner";
import Controller from "./_components/Controller";
import { Button } from "@/components/ui/button";
import { RWebShare } from "react-web-share";
// import { toast } from "sonner";
// import Controller from "../_components/Controller";

function EditFrom({ params }) {
  const { user } = useUser();
  const [jsonFrom, setJsonFrom] = useState([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState();
  useEffect(() => {
    user && getFromData();
  }, [user]);
  const getFromData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.fromId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setRecord(result[0]);
    setJsonFrom(JSON.parse(result[0].jsonfrom));

    setSelectedBackground(result[0].background);
    setSelectedTheme(result[0].theme);
  };
  useEffect(() => {
    if (updateTrigger) {
      setJsonFrom(jsonFrom);
      updateJsonFromInDb();
    }
  }, [updateTrigger]);
  const onFieldUpdate = (value, index) => {
    jsonFrom.fields[index].label = value.label;
    jsonFrom.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
    console.log(jsonFrom);
  };

  const updateJsonFromInDb = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonfrom: jsonFrom,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    toast("Form Updated Successfully");
    console.log(result);
  };

  const deleteField = (indexToRemove) => {
    const result = jsonFrom.fields.filter(
      (item, index) => index !== indexToRemove
    );
    console.log(result);
    jsonFrom.fields = result;
    setUpdateTrigger(Date.now());
  };

  const updateControllerFields = async (value, columnName) => {
    const result = await db
      .update(JsonForms)
      .set({
        [columnName]: value,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    toast("Form Updated Successfully");
  };
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={"/aifrom/" + record?.id} target="_blank">
            <Button className="flex gap-2 hover:bg-gray-700">
              <SquareArrowOutUpRight className="h-5 w-5" />
              Live Preview
            </Button>
          </Link>

          <RWebShare
            data={{
              text:
                jsonFrom?.formHeading +
                " ,Build your own form with AI form builder",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aifrom/" + record?.id,
              title: jsonFrom?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2 bg-green-600 hover:bg-green-400">
              <Share className="h-5 w-5" />
              Share
            </Button>
          </RWebShare>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        <div className=" p-5 border rounded-lg shadow-md">
          <Controller
            selectedTheme={(value) => {
              updateControllerFields(value, "theme");
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              updateControllerFields(value, "background");
              setSelectedBackground(value);
            }}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center"
          style={{ backgroundImage: selectedBackground }}
        >
          {/* <form action=""></form> */}
          <FromUi
            jsonFrom={jsonFrom}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditFrom;
