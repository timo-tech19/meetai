"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { columns } from "@/modules/meetings/ui/components/columns";
import EmptyState from "@/components/empty-state";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Create a meeting to start a call with your agents. Each meeting lets you collaborate, share ideas, and interact with your agent in real time."
        />
      )}
    </div>
  );
};

export default MeetingsView;
