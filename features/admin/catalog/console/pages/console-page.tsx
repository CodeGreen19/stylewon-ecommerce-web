import { db } from "@/drizzle/db";
import { defaultDeliveryCharge } from "@/drizzle/schema";
import { DeliveryCharge } from "../components/delivery-charge";

export default async function ConsolePage() {
  const [res] = await db.select().from(defaultDeliveryCharge);
  return (
    <div>
      <DeliveryCharge
        insideDhaka={res.insideDhaka.toString()}
        outsideDhaka={res.outsideDhaka.toString()}
      />
    </div>
  );
}
