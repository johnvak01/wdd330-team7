import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;

    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];

    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice,
      0
    );

    const subtotal = document.querySelector(
      `${this.outputSelector} #subtotal`
    );

    subtotal.innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    if (this.list.length > 0) {
      this.shipping =
        10 + (this.list.length - 1) * 2;
    } else {
      this.shipping = 0;
    }

    this.orderTotal =
      this.itemTotal +
      this.tax +
      this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(
      `${this.outputSelector} #tax`
    );

    const shipping = document.querySelector(
      `${this.outputSelector} #shipping`
    );

    const orderTotal = document.querySelector(
      `${this.outputSelector} #order-total`
    );

    tax.innerText =
      `$${this.tax.toFixed(2)}`;

    shipping.innerText =
      `$${this.shipping.toFixed(2)}`;

    orderTotal.innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }
}