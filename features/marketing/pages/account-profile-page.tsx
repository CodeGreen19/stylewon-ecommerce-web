"use cache: private";

import { getQueryClient } from "@/tanstack-query/get-query-client";
import { PersonalInfo } from "../components/account/personal-info";
import { getUserInfo } from "../server/account.action";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";

export default async function AccountProfilePage() {
  const qc = getQueryClient();
  void qc.prefetchQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Loading />}>
          <PersonalInfo />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
