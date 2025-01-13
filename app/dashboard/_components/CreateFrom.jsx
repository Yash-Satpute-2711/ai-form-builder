"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AIModel";
import { useUser } from "@clerk/nextjs";
import { JsonForms } from "@/configs/schema";
import moment from "moment/moment";
import { db } from "@/configs";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
const PROMPT =
  ",On Basis of description create JSON form with formTitle, formHeading along with fieldName, FieldTitle,FieldType, Placeholder, label , required fields, and checkbox and select field type options will be in array only and in JSON format";
function CreateFrom() {
  const [openDialog, setOpenDailog] = useState(false);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState();
  const { user } = useUser();
  const route = useRouter();

  const onCreateFrom = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description:" + userInput + PROMPT
    );
    console.log(result.response.text());

    if (result.response.text()) {
      const resp = await db
        .insert(JsonForms)
        .values({
          jsonfrom: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD/MM/YYYY"),
        })
        .returning({ id: JsonForms.id });
      console.log("New From ID", resp[0].id);
      if (resp[0].id) {
        route.push("/edit-from/" + resp[0].id);
      }
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div>
      <Button onClick={() => setOpenDailog(true)}>+ Create From</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new from </DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                onChange={(event) => setUserInput(event.target.value)}
                placeholder="Write Description of your from "
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button
                  onClick={() => setOpenDailog(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={() => onCreateFrom()}>
                  {loading ? <Loader2 className="animate-spin" /> : "Create"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateFrom;
