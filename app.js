async function getStoreData() {
  const fakeStoreApi = await fetch("https://fakestoreapi.com/products/");
  const result = await fakeStoreApi.json();
  // console.log(result);
  let cont = document.getElementById("row");
  let card = document.createElement("div");
  card.setAttribute("class", "row w-100");  
  result.map((item) => {
    card.innerHTML += `
    <div id="${item.id}" class=" carditem card col-2 w-25 fs-6 pt-4 mt-3 ms-5 bg-white" >
              <img src="${item.image}" id="img" class="card-img-top" alt="">
              <hr>
              <div class="card-body fs-3 fw-bolder">
                <h5 class="card-title" id="title">${item.title}</h5>
                <h5 class="card-text" id="category">${item.category}</h5>
                <div class=" d-flex justify-content-between">
                <div><p class="card-text" id="price"><small class="text-body-secondary">$${item.price}</small></div>
                <div><button onclick="cartitem(${item.id})" class="btnall hover-under" >add item</button></div>
                </div>
                </p>
    </div>`;
    cont.appendChild(card);
  });
}
getStoreData()
document.getElementById("viewitem").addEventListener("click", () => {
  document.getElementById("row").classList.remove("d-none");
});
document.getElementById('cartitem').addEventListener("click",()=>{
  document.getElementById('hidebox').classList.add("d-none");
})
let cart = [];

// Function to add items to the cart
function cartitem(itemId) {
  fetch("https://fakestoreapi.com/products/" + itemId)
    .then((response) => response.json())
    .then((item) => {
      cart.push(item); // Add the selected item to the cart array
      alert(`${item.title} has been added to your cart.`);
    });
}

// Function to display the cart items
function displayCart() {
  let cartContainer = document.getElementById("row-1");
  // Use the "row-1" container to display cart items
  cartContainer.innerHTML = ""; // Clear the container before rendering cart items
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center w-100 fw-bold">Your cart is empty.</p>`;
    return;
  } 
  cart.forEach((item,index) => { 
    cartContainer.innerHTML += `
    <h1 id="heading" class="fw-bolder text-center m-3 text-decoration-underline">Cart-Item-${index}</h1>
      <div class="card col-3 d-flex justify-content-between  mt-2 w-100 bg-info  p-2 bg-white" id="cart-item-${index}">
        <img src="${item.image}" class="card-img-top object-fit-contain img-cart"  style="height: 100px; width: 100px;" alt="${item.title}" />
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">Category: ${item.category}</p>
        <div class=" fs-6 card-body">
        <p class="card-text">Price: $${item.price}</p>
        <button onclick="removeCartItem(${index})" class="btn btn-danger btn-sm">Remove</button>
        </div>
        </div>`;
  });
}
// Function to remove an item from the cart
function removeCartItem(index) {
  const removedItem = cart.splice(index, 1)[0];
  alert(`${removedItem.title} has been removed from your cart.`);
  displayCart(); // Re-render the cart items
}

// Add a click event listener for the "Cart Item" link
document.querySelectorAll("a.nav-item").forEach((link) => {
  if (link.textContent.includes("Cart Item")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      displayCart(); // Show cart items when the user clicks "Cart Item"
    });
  }
});
