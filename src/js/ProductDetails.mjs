import { setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    }
    addProductToCart() {
        let tasks = JSON.parse(localStorage.getItem("so-cart")) || [];
        tasks.push(this.product);
        setLocalStorage("so-cart", tasks);
    }
    renderProductDetails() {
        document.querySelector('h2').textContent = this.product.Brand.Name;
        document.querySelector('h3').textContent = this.product.NameWithoutBrand;
      
        const productImage = document.getElementById('productImage');
        productImage.src = this.product.Images.PrimaryLarge;
        productImage.alt = this.product.NameWithoutBrand;
      
        document.querySelector('.product-card__price').textContent = "$" + this.product.FinalPrice;
        if (this.product.FinalPrice < this.product.SuggestedRetailPrice) {
            document.querySelector('.product-card__price').innerHTML += `<span class="product-card__price--sale">: Discounted ${((this.product.FinalPrice/this.product.SuggestedRetailPrice)*100).toFixed(0)}%!</span>`;
        }
        document.querySelector('.product__color').textContent = this.product.Colors[0].ColorName;
        document.querySelector('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
      
        document.getElementById('addToCart').dataset.id = this.product.Id;
    }
};
