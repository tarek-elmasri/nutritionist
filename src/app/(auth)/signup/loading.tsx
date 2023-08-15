import PageLoader from "@/components/ui/page-loader";

const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-content-center">
      <PageLoader />
    </div>
  );
};

export default Loading;
