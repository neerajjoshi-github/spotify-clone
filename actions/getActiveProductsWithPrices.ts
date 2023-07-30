import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ProductWithPrice } from "../types";
import { cookies } from "next/headers";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase
    .from("products")
    .select("*,prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(
      "Error while fetching product with prices from supabase : ",
      error
    );
  }

  return (data as any) || [];
};

export default getActiveProductsWithPrices;
