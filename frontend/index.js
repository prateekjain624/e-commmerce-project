document.addEventListener("DOMContentLoaded", () => {
  let cartItems = [];
  async function fetchProductsData() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);

      displayproducts(data);
      displayComparisonTable(data);
    } catch (err) {
      console.log(err);
    }
  }

  fetchProductsData();

  function displayproducts(products) {
    const productsContainer = document.getElementById("card-container");

    const firstTenProducts = products.slice(0, 12);
    console.log(firstTenProducts);
    firstTenProducts.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
            
                  <img
                    src="${product.image}"
                    alt=""
                  />
                  <h3>${product.title}</h3>
                  <p>$${product.price}</p>
                  <div class="buttons">
                  <a href="#" class="cart-btn">Add to Cart</a>
              
                  <a href="#" class="buynow-btn">Buy Now</a>
                  
                  
                  </div>
            
              `;

      productsContainer.appendChild(card);

      const cartBtn = card.querySelector(".cart-btn");
      cartBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const existingProduct = cartItems.findIndex(
          (item) => item.id === product.id
        );
        if (existingProduct === -1) {
          cartItems.push(product);
          alert("product successfully added");
        } else {
          cartItems[existingProduct].quantity += 1;
          alert("product quantity increased by 1 ");
        }
      });
    });
  }

  function displayComparisonTable(productData) {
    const tableBody = document.getElementById("table-body");
    console.log(productData);
    const products = productData.splice(0, 6);
    console.log(products);
    products.forEach((product) => {
      const tableRow = document.createElement("tr");

      tableRow.innerHTML = `

              <td><span>${product.title}</span></td>
              <td><span>${product.price}</span></td>
              <td>
                <span>${product.description}</span>
              </td>
              <td><span>${product.size ?? "N/A"}</span></td>

              <td><span>${product.weight ?? "N/A"}</span></td>

        
      `;

      tableBody.appendChild(tableRow);
    });
  }
});
