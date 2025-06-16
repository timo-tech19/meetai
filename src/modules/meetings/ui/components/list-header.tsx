"use client";

import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE } from "@/lib/constant";
import NewMeetingDialog from "./new-meeting-dialog";

const ListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon /> New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          {/* TODO: Filters */}
        </div>
      </div>
    </>
  );
};

export default ListHeader;
