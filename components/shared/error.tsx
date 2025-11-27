import { AlertCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="p-12 rounded-xl border">
        <AlertCircle />
      </div>
    </div>
  );
}
