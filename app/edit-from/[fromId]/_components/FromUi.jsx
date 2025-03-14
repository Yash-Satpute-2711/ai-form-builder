import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
// import FieldEdit from "./FieldEdit";
import { Button } from "@/components/ui/button";
import FieldEdit from "./FieldEdit";
import { userResponse } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";
import { db } from "@/configs";

function FromUi({
  jsonFrom,
  selectedTheme,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId = 0,
}) {
  const [formData, setFormData] = useState();
  let formRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const result = await db.insert(userResponse).values({
      jsonResponse: formData,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      formRef: formId,
    });

    if (result) {
      formRef.reset();
      toast("Response Submitted Successfully");
    } else {
      toast("ERROR: Response Not Submitted");
    }
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];
    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    } else {
      const result = list.filter((item) => item.label == itemName);
      setFormData({
        ...formData,
        [fieldName]: result,
      });
    }
  };
  return (
    <form
      ref={(e) => (formRef = e)}
      onSubmit={onFormSubmit}
      className="border p-5 md:w-[600px] shadow-2xl shadow-black/100 rounded-lg   "
      data-theme={selectedTheme}
    >
      <h2 className=" font-bold text-center text-2xl ">
        {jsonFrom?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonFrom?.formHeading
          ? jsonFrom.formHeading.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))
          : jsonFrom?.formSubHeading}
      </h2>
      {jsonFrom?.fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field?.fieldType == "select" ? (
            <div className="my-3 w-full ">
              <label className="text-sm ">{field?.fieldTitle}</label>
              <Select
                required={field?.required}
                onValueChange={(v) => handleSelectChange(field.fieldName, v)}
              >
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue
                    placeholder={field?.placeholder || field?.fieldTitle}
                  />
                </SelectTrigger>
                <SelectContent>
                  {field?.options?.map((item, optIndex) => (
                    <SelectItem key={optIndex} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className="my-3 w-full bg-transparent">
              <label className="text-sm ">{field?.fieldTitle}</label>
              <RadioGroup required={field?.required}>
                {field.options.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <RadioGroupItem
                      value={item.label || item}
                      id={item.label || item}
                      onClick={() =>
                        handleSelectChange(field.fieldName, item.label)
                      }
                    />
                    <Label
                      htmlFor={item.label || item}
                      className="text-gray-500"
                    >
                      {item.label || item}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-sm  ">
                {field?.fieldTitle || field?.label}
              </label>
              {field?.options ? (
                field?.options?.map((item, index) => (
                  <div
                    key={index}
                    className="text-sm flex gap-2 my-2 items-center text-gray-500"
                  >
                    <Checkbox
                      onCheckedChange={(v) =>
                        handleCheckboxChange(
                          field?.label,
                          item || item.label,
                          v
                        )
                      }
                    />
                    <h2>{item || item.label}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2">
                  <Checkbox required={field.required} />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full bg-transparent">
              <label className="text-sm ">{field?.label}</label>
              <Input
                type={field?.type}
                placeholder={field?.placeholder}
                name={field?.fieldName}
                className="bg-transparent"
                required={field?.required}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          )}

          {editable && (
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FromUi;
