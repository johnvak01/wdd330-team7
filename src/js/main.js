import Alert from "./alerts.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ProductSearch from "./ProductSearch.mjs";

const alert = new Alert("/json/alerts.json");
alert.init();

const productSearch = new ProductSearch();
productSearch.init();

loadHeaderFooter();
