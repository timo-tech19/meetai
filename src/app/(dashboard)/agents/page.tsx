import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AgentsView from "@/modules/agents/ui/views/agents-views";
import { getQueryClient, trpc } from "@/trpc/server";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import ListHeader from "@/modules/agents/ui/components/list-header";
import { auth } from "@/lib/auth";

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Agents"
              description="This may take a few seconds."
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error loading Agents"
                description="Something went wrong"
              />
            }
          >
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}

export default Page;
