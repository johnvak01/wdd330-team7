import { renderListWithTemplate } from "./utils.mjs";
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  
  _productCardTemplate(product) {
  let discountText = "";
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    discountText = "product with discount";
  }
  return `
    <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img
            src="${product.Image}"
            onerror="this.src='../images/tents/no-image-available.webp'"
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


  renderList(productList) {
    renderListWithTemplate(
      this._productCardTemplate,
      this.listElement,
      productList,
      "afterbegin",
      true
    );
  }

}