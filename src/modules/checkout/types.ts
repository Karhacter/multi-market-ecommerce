import type Stripe from "stripe";

export type ProductMeta = {
  stripeAccountId: string;
  id: string;
  name: string;
  price: number;
};

export type CheckoutMetaData = {
  userID: string;
};

export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMeta;
    };
  };
};
