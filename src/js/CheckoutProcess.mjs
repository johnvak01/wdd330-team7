// checkout module

import { getLocalStorage } from "./utils.mjs";
import { formDataToJSON } from "./utils.mjs";
export default class CheckoutProcess {

    constructor(cartKey, service) {

        this.cartKey = cartKey;
        this.service = service;

        this.cart = getLocalStorage(this.cartKey) || [];

        this.taxRate = 0.06;
        this.shipping = 0;

        this.itemSubtotal = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    calculateSubtotal() {

        this.cart = getLocalStorage(this.cartKey) || [];

        this.itemSubtotal = this.cart.reduce(
            (total, item) => total + item.FinalPrice,
            0
        );

        return this.itemSubtotal;
    }

    displayTotals() {

        this.calculateSubtotal();

        const subtotal = document.querySelector("#subtotal");
        const tax = document.querySelector("#tax");
        const shipping = document.querySelector("#shipping");
        const total = document.querySelector("#orderTotal");

        if (!subtotal) return;

        subtotal.textContent =
            `$${this.itemSubtotal.toFixed(2)}`;

        this.tax =
            this.itemSubtotal * this.taxRate;

        tax.textContent =
            `$${this.tax.toFixed(2)}`;

        const quantity = this.cart.length;

        this.shipping =
            quantity > 0 ? 10 + ((quantity - 1) * 2) : 0;

        shipping.textContent =
            `$${this.shipping.toFixed(2)}`;

        this.orderTotal =
            this.itemSubtotal +
            this.tax +
            this.shipping;

        total.textContent =
            `$${this.orderTotal.toFixed(2)}`;
    }
    packageItems(items) {

        return items.map(item => ({
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: 1
            }));
    }

    async checkout(form) {

        const formData =
            formDataToJSON(form);

        const order = {
            orderDate: new Date().toISOString(),
            ...formData,

            items:
                this.packageItems(this.cart),

            orderTotal:
                this.orderTotal.toFixed(2),

            shipping:
                this.shipping,

            tax:
                this.tax.toFixed(2)
        };

        return await this.service.checkout(order);

    }
}
