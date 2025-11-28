import AccountLayout from "@/features/account/layout";
import MarketingLayout from "@/features/marketing/layout";
import React from "react";

export default function layout(props: LayoutProps<"/">) {
  return (
    <div className="marketing-bg">
      <MarketingLayout {...props}>
        <AccountLayout {...props} />
      </MarketingLayout>
    </div>
  );
}
