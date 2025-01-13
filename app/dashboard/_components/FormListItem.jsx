import { Button } from "@/components/ui/button";
import { Edit, Share, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/clerk-react";
import { JsonForms } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { db } from "@/configs";
import { RWebShare } from "react-web-share";

function FormListItem({ formRecord, jsonforms, refreshData }) {
  const { user } = useUser();
  const onDeleteForm = async () => {
    const result = await db
      .delete(JsonForms)
      .where(
        and(
          eq(JsonForms.id, formRecord.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    if (result) {
      toast("Form Deleted Successfully");
      refreshData();
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-4 mb-3">
      <div className="flex justify-between">
        <h2></h2>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash
              className="h-5 w-5 text-red-600 cursor-pointer
             hover:scale-150 transition-all
            "
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <h2 className=" text-lg text-black">{jsonforms?.formTitle}</h2>
      <h2 className=" text-sm text-gray-500">{jsonforms?.formHeading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between">
        <RWebShare
          data={{
            text:
              jsonforms?.formHeading +
              " ,Build your own form with AI form builder",
            url: process.env.NEXT_PUBLIC_BASE_URL + "/aifrom/" + formRecord?.id,
            title: jsonforms?.formTitle,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button variant="outline" size="sm" className="flex gap-2">
            <Share className="h-5 w-5" />
            Share
          </Button>
        </RWebShare>
        <Link href={"/edit-from/" + formRecord?.id}>
          <Button size="sm" className="flex gap-2">
            <Edit className="h-5 w-5" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FormListItem;
