// search product class 
import { getParam } from "./utils.mjs";

export default class ProductSearch {
    constructor(dataSource, productList) {
        this.dataSource = dataSource;
        this.productList = productList;
        this.searchTerm = getParam("search");
    }

    init() {
        this.bindSearchForm();
    }

    bindSearchForm() {
        const form = document.querySelector(".search-form");

        if (!form) return;

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const input = document.querySelector("#search-input");
            const term = input.value.trim();

            if (!term) return;

            window.location.href = `/product_listing/?search=${encodeURIComponent(term)}`;
        });
    }

    async search() {
        if (!this.searchTerm) return [];

        try {
            const products = await this.dataSource.searchProducts(this.searchTerm);

            if (!products || products.length === 0) {
                this.productList.listElement.innerHTML = `
                <li class="no-results">No products found for "<strong>${this.searchTerm}</strong>"</li>
        `;
                return [];
            }

            this.productList.renderList(products);
            return products;
        } catch (err) {

            this.productList.listElement.innerHTML = `
        <li class="no-results">Unable to retrieve products. Please try again.</li>`;
            return [];
        }
    }
}
