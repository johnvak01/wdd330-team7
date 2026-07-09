import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // Get the selected product
        this.product = await this.dataSource.findProductById(this.productId);

        // render / display the product
        this.renderProductDetails();

        // add listener to the button
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCart.bind(this));
    }

  // moved these functions from product.js
    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }

    addToCart() {
        this.addProductToCart(this.product);
    }

  // let's render the products
    renderProductDetails() {
        const section = document.querySelector(".product-detail");

        section.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>

      <h2 class="divider">
        ${this.product.NameWithoutBrand}
      </h2>

      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.Name}"
      />

      <p class="product-card__price">
        $${this.product.FinalPrice}
      </p>

      <p class="product__color">
        ${this.product.Colors[0].ColorName}
      </p>

      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="{this.product.Id}">
          Add to Cart
        </button>
      </div>
    `;
    }
}
// <------ Then End --------------->