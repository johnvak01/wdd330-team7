export default class CheckoutProcess{
    constructor(){
        this.cartItems = [];
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.total = 0;
    }
    async init(){
        this.cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
        this.subtotal = this.calcSubTotal();
        this.tax = this.calcTax(this.subtotal);
        this.shipping = this.calcShipping(this.subtotal);
        this.renderOrderTotals();
    }
    calcSubTotal(){
        let total = 0;
        const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
        for (const item of cartItems) {
            total += item.FinalPrice;
        }
        return total;
    }
    calcTax(subtotal){
        return total * 0.06;
    }
    calcShipping(subtotal){
        if(subtotal.length() < 2){
            return 10;
        }
        else{
            let shippingcost = 8;
            for(const item of subtotal){
                shippingcost += 2;
            }
            return shippingcost;
        }
    }
    renderOrderTotals(){
        const subtotalElement = document.querySelector("#summary-subtotal + span");
        const taxElement = document.querySelector("#summary-tax + span");
        const shippingElement = document.querySelector("#summary-shipping + span");
        const totalElement = document.querySelector("#summary-total + span");

        subtotalElement.textContent = `$${this.subtotal.toFixed(2)}`;
        taxElement.textContent = `$${this.tax.toFixed(2)}`;
        shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
        totalElement.textContent = `$${(this.subtotal + this.tax + this.shipping).toFixed(2)}`;
    }
}