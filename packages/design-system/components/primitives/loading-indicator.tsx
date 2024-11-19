import { Loader } from "lucide-react";

export const LoadingIndicator = () => {
  return (
    <div className="flex h-full min-h-20 w-full grow items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};
