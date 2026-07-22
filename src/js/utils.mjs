// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.innerHTML = template;
  if (callback) {  
    callback(data);
  }
}

export async function loadTemplate(path){
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerElement = document.querySelector("header");
  const headerTemplate = await loadTemplate("/partials/header.html");
  
  const footerElement = document.querySelector("footer");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  
  const cart_superscript = document.querySelector(".cart_superscript");

  let cart = getLocalStorage("so-cart") || [];
  console.log(cart.length);
  if (cart.length > 0) {
    cart_superscript.textContent = cart.length;
  } else {
    cart_superscript.textContent = "";
    cart_superscript.classList.add("hide");
  }  

}