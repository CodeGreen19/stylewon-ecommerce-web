import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { relatedProducts } from "../server/actions";
import DetailsBox from "../components/product-details/details-box";
import RelatedProducts from "../components/product-details/related-products";
import { productDetails } from "../server/queries";

export default async function ProductDetailsPage({ slug }: { slug: string }) {
  const qc = getQueryClient();
  void qc.prefetchQuery({
    queryKey: ["marketing-product-details", slug],
    queryFn: () => productDetails(slug),
  });
  void qc.prefetchQuery({
    queryKey: ["related-products"],
    queryFn: () => relatedProducts(),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(qc)}>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <DetailsBox id={slug} />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <RelatedProducts />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
