import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import MeetingsView from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Meetings"
            description="This may take a few seconds."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Error loading Meetings"
              description="Something went wrong"
            />
          }
        >
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}

export default Page;
