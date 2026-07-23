import { loadHeaderFooter } from "./utils.mjs";

import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess(
  "so-cart",
  ".products"
);

loadHeaderFooter();
checkout.init();
