import { Ban } from "lucide-react";

export function EmptyCartBox() {
  return (
    <div className="flex justify-center items-center space-x-2 rounded-md py-20 border border-cyan-600 border-dashed">
      <span>Your cart is empty</span> <Ban />
    </div>
  );
}
