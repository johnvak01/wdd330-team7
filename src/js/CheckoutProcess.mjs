import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}
function packageOrder(items) {
    const itemsFormatted = items.map((item) => (
        {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity || 1,
        }
    ));
    return itemsFormatted;
}

export default class CheckoutProcess {
    constructor(key) {
        this.key = key;
        this.cartItems = [];
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.total = 0;
    }
    async init() {
        this.cartItems = JSON.parse(localStorage.getItem(this.key)) || [];
        this.subtotal = this.calcSubTotal();
        this.tax = this.calcTax();
        this.shipping = this.calcShipping();
        this.calcOrderTotal();
        this.renderOrderTotals();
    }
    calcSubTotal() {
        let total = 0;
        const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
        for (const item of cartItems) {
            total += item.FinalPrice * (item.quantity || 1);
        }
        return total;
    }
    calcTax() {
        return this.subtotal * 0.06;
    }
    calcShipping(cartItems) {
        const totalItems = this.cartItems.reduce(
            (total, item) => total + (item.quantity || 1),
            0,
        );
        if (totalItems < 2) {
            return 10;
        }
        return 8 + (totalItems * 2);
    }
    calcOrderTotal(){
        this.total = this.subtotal + this.tax + this.shipping;
    }
    renderOrderTotals() {
        const subtotalElement = document.querySelector("#summary-subtotal + span");
        const taxElement = document.querySelector("#summary-tax + span");
        const shippingElement = document.querySelector("#summary-shipping + span");
        const totalElement = document.querySelector("#summary-total + span");

        subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;
        taxElement.textContent = `$${this.tax.toFixed(2)}`;
        shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
        totalElement.textContent = `$${(this.subtotal + this.tax + this.shipping).toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.total;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageOrder(this.cartItems);
        //console.log(order);
        try {
            const response = await services.checkout(order);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
}