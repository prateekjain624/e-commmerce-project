document.addEventListener("DOMContentLoaded", () => {
  let cartItems = [];
  let allProducts = [];
  const productList = document.getElementById("product-list");

  async function fetchJsonData() {
    try {
      const res = await fetch("./products.json");
      const products = await res.json();

      displayProducts(products);
      allProducts = products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function displayProducts(products) {
    // Clear the current displayed products
    productList.innerHTML = "";

    products.forEach((product) => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("col-sm-6", "col-md-4", "col-lg-3", "margin");

      cardDiv.innerHTML = `
      <div class="card">
        <img src=${product.image} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">${product.price}</p>
          <div class="cart-actions">
            <input type="number" class="quantity-input" value=${product.quantity} min="1">
            <button class="addtocart">Add to cart</button>
          </div>
        </div>
      </div>
    `;

      productList.appendChild(cardDiv);

      const addToCart = cardDiv.querySelector(".addtocart");

      addToCart.addEventListener("click", () => {
        const existingProductIndex = cartItems.findIndex(
          (item) => item.name === product.name
        );

        if (existingProductIndex === -1) {
          cartItems.push(product);
          alert("Product has been added to cart successfully.");
        } else {
          cartItems[existingProductIndex].quantity += 1;
          alert("Product quantity has been increased successfully.");
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log(cartItems);
      });
    });
  }

  fetchJsonData();

  let debounced = _.debounce(handleSearch, 400);

  document.querySelector("#search").addEventListener("input", debounced);
  document
    .querySelector("#price-range")
    .addEventListener("change", applyfilters);

  function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase();

    // Filter the products
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)
    );

    // Display the filtered products
    displayProducts(filteredProducts);
  }

  function applyfilters() {
    const search = document.querySelector("#search").value.toLowerCase();
    const priceRange = document.querySelector("#price-range").value;

    let min = 0;
    let max = Infinity;

    if (priceRange === "") {
      displayProducts(allProducts);
    } else {
      const PriceRange = priceRange.split("-");
      [min, max] = PriceRange;
      const filteredProducts = allProducts.filter((product) => {
        return (
          product.price >= min &&
          product.price <= max &&
          (product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search))
        );
      });

      displayProducts(filteredProducts);
    }
  }
});
