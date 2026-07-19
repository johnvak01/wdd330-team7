import Alert from "./alerts.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const alert = new Alert("/json/alerts.json");
alert.init();

loadHeaderFooter();