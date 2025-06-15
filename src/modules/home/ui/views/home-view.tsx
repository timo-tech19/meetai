"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Session, User } from "better-auth";

const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Timo" }));

  return (
    <div>
      <h1>{data?.greeting}</h1>
    </div>
  );
};

export default HomeView;
