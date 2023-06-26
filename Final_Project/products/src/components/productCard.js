import './style.css';

export const createProductCard = (product) => `
   <div class="card">
      <p class="name-card">${product.name}</p>
      <img src=${product.image} />
      <p class="price-card"><i class="fa-solid fa-tag" id="price-icon"></i> $ ${product.price}</p>
      <a href="src/pages/details/details.html?id=${product.id}" id="details-btn">Details</a>
   </div>
`;
