import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponse } from "@/configs/schema";
import { Item } from "@radix-ui/react-radio-group";
import { eq } from "drizzle-orm";
import { json } from "drizzle-orm/mysql-core";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import * as XLSX from "xlsx";
function FormListItemReso({ jsonforms, formRecord }) {
  const [loading, setLoading] = useState(false);

  const ExportData = async () => {
    let jsonData = [];
    setLoading(true);
    const result = await db
      .select()
      .from(userResponse)
      .where(eq(userResponse.formRef, formRecord.id));

    console.log(result);
    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      });
      setLoading(false);
    }
    console.log(jsonData);
    exportToExcel(jsonData);
  };

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, jsonforms?.formTitle + ".xlsx");
  };
  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className=" text-lg text-black">{jsonforms?.formTitle}</h2>
      <h2 className=" text-sm text-gray-500">{jsonforms?.formHeading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        {/* <h2 className="text-sm">
          <strong>45</strong> Responses
        </h2> */}
        <Button
          className="hover:color-white"
          onClick={() => ExportData()}
          disabled={loading}
        >
          {loading ? <Loader2 className=" animate-spin" /> : "Export "}
        </Button>
      </div>
    </div>
  );
}

export default FormListItemReso;
