import './style.css';

export const createProductDetailsCard = (product) => `
   <div class="card-details">
      <p class="name-details">${product.name}</p>
      <img src=${product.image} id="img-details"/>
      <p class="stock-details">In stock: ${product.stock}</p>
      <p class="price-details">Price: $ ${product.price}</p>
      <a href="/src/pages/details/details.html?id=${product.id}"></a>
      <p class="prod-details">${product.details}</p>
      <button class="add-to-cart-btn">Add To Cart</button>
   </div>
`; 
