import MarketingLayout from "@/features/marketing/layout";

export default function layout(props: LayoutProps<"/">) {
  return (
    <div className="marketing-bg">
      <MarketingLayout {...props} />;
    </div>
  );
}
