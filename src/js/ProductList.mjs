import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discountText = "";
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    discountText = "product with discount";
  }
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img
            src="${product.Images.PrimaryMedium}"
            alt="Image of ${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-card_price_discount">${discountText}</p>
      </a>
    </li>
  `;
} 

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    return list;
  }

  renderList(productList) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      productList,
      "afterbegin",
      true
    );
  }

}