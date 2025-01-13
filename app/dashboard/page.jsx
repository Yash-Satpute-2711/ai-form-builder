import React from "react";
import { Button } from "@/components/ui/button";
import CreateFrom from "./_components/CreateFrom";
import FormList from "./_components/FormList";
function Dashboard() {
  return (
    <div className="bg-white p-10">
      <h2 className="text-3xl font-bold flex justify-between items-center">
        Dashboard
        <CreateFrom />
      </h2>
      {/* List of From */}
      <FormList />
    </div>
  );
}

export default Dashboard;
