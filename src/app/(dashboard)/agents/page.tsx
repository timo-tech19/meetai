import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import AgentsView from "@/modules/agents/ui/views/agents-views";
import { getQueryClient, trpc } from "@/trpc/server";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
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
  );
}

export default Page;
