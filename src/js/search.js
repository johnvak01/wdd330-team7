const form = document.querySelector(".search-form");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.querySelector("#search-input");

    const term = input.value.trim();

    if (!term) {
      return;
    }

    window.location.href = `/product_listing/?search=${encodeURIComponent(term)}`;
  });
}
