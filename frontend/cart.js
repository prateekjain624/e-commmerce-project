document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const totalContainer = document.getElementById("total");
  const checkoutContainer = document.getElementById("checkout");
  function fetchproducts() {
    const productData = localStorage.getItem("cartItems") || [];
    let products = JSON.parse(productData);

    if (products.length > 0) {
      cartContainer.innerHTML = ""; // Clear the container once
      console.log(products);
      products.forEach((product, index) => {
        const productItem = document.createElement("div");
        productItem.className = "card";

        productItem.innerHTML = `
                <img
                    src="${product.image}"
                    alt=""
                />

                <div class="cart-item-details">
                    <h3 class="item-title">${product.name}</h3>
                    <p class="item-price">$${product.price}</p>
                </div>

                <div class="cart-actions">
                    <input type="number" class="quantity-input" value="${product.quantity}" min="1" />
                    <button class="remove-btn">Remove</button>
                </div>
            `;
        cartContainer.appendChild(productItem);

        const removeBtn = productItem.querySelector(".remove-btn");
        const quantityInput = productItem.querySelector(".quantity-input");

        removeBtn.addEventListener("click", () => {
          products.splice(index, 1);
          localStorage.setItem("cartItems", JSON.stringify(products));
          fetchproducts();
          totalPrice();
        });

        quantityInput.addEventListener("change", (event) => {
          product.quantity = parseInt(event.target.value);
          localStorage.setItem("cartItems", JSON.stringify(products));
          fetchproducts();
        });

        totalPrice();
      });
    } else {
      cartContainer.innerHTML = `<h2 class="empty-cart">Your cart is empty</h2>`;
    }
  }
  fetchproducts();

  //   function to calculate the total
  function totalPrice() {
    let total = 0;

    const productData = localStorage.getItem("cartItems") || [];
    let products = JSON.parse(productData);
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    totalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
  }

  checkoutContainer.addEventListener("click", () => {
    alert("proceeding to checkout");
  });
});
