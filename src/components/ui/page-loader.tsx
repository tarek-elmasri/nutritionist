"use client";

import { HashLoader } from "react-spinners";

const PageLoader = ({ message }: { message?: string }) => {
  return (
    <div className="fixed inset-0 z-50  backdrop-blur-sm grid place-items-center">
      <div className="flex items-center gap-6 bg-primary/90 px-12 py-8 rounded-2xl shadow-md shadow-neutral-950/30">
        <HashLoader size={40} color="#fff" />
        <p className="text-md font-semi-bold text-neutral-100">
          {message ?? "Please wait"}
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
