"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      <h2>Agents view</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AgentsView;
