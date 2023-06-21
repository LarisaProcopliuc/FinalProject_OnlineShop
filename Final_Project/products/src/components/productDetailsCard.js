import './style.css';

export const createProductDetailsCard = (product) => `
   <div class="card details">
      <p>${product.name}</p>
      <img src=${product.image} />
      <p>Price:${product.price}</p>
      <a href="/src/pages/details/details.html?id=${product.id}"></a>
      <button class="add-to-cart-btn">Add To Cart</button>
      <p>${product.details}</p>
      <p>Stock:${product.stock}</p>
   </div>
`; 
