"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { Price, ProductWithPrice } from "@/types";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
  return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Login to continue!!");
    }
    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Already subscribed!!");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let contnet = <div className="text-center">No products available</div>;

  if (products.length) {
    contnet = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }
          return product.prices.map((price) => {
            return (
              <Button
                key={price.id}
                disabled={isLoading || price.id === priceIdLoading}
                onClick={() => handleCheckout(price)}
                className="mb-4"
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            );
          });
        })}
      </div>
    );
  }

  if (subscription) {
    contnet = <div className="text-center">Already subscribed!!</div>;
  }
  return (
    <Modal
      title="Only for premium users"
      description="Listen to add free music on spotify"
      isOpen={subscribeModal.isopen}
      onChange={onChange}
    >
      {contnet}
    </Modal>
  );
};

export default SubscribeModal;
