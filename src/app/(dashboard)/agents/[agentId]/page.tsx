import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import SingleAgentView from "@/modules/agents/ui/views/single-agent-view";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ agentId: string }>;
}

async function Page({ params }: Props) {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agent"
            description="This may take a few seconds."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error loading Agent"
              description="Something went wrong"
            />
          }
        >
          <SingleAgentView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}

export default Page;
