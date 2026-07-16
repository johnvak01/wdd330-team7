import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this));
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCartHandler).bind(this);
    }
    addProductToCart() {
        let tasks = JSON.parse(localStorage.getItem("so-cart")) || [];
        tasks.push(this.product);
        setLocalStorage("so-cart", tasks);
    }
    renderProductDetails() {
        document.querySelector("h2").textContent = this.product.Brand.Name;
        document.querySelector("h3").textContent = this.product.NameWithoutBrand;
      
        const productImage = document.getElementById("productImage");
        productImage.src = this.product.Image;
        productImage.alt = this.product.NameWithoutBrand;
      
        document.getElementById("productPrice").textContent = this.product.FinalPrice;
        document.getElementById("productColor").textContent = this.product.Colors[0].ColorName;
        document.getElementById("productDesc").innerHTML = this.product.DescriptionHtmlSimple;
      
        document.getElementById("addToCart").dataset.id = this.product.Id;
    }
};
