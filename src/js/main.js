import Alert from "./alerts.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productData = new ProductData("tents");
const alert = new Alert("/json/alerts.json");
alert.init();

const productList = new ProductList(
    "tents",
    productData,
    document.querySelector(".product-list")
);

productList.init();

loadHeaderFooter();