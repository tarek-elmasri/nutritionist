import PageLoader from "@/components/ui/page-loader";

const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-content-center">
      <PageLoader message="Please wait while loading your profile data." />
    </div>
  );
};

export default Loading;
