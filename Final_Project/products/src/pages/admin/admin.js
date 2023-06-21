// import { getProducts } from '../../api/getProducts';

// // const populateAdminTable = async () => {
// //   const products = await getProducts();

// //   const adminTable = document.querySelector('.admin-tab');

// //   products.forEach((product) => {
// //     const row = document.createElement('tr');
// //     row.innerHTML = `
// //       <td class="image-cell"><img src="${product.image}" alt="Product Image"/></td>
// //       <td class="name-cell">${product.name}</td>
// //       <td class="price-cell">${product.price}</td>
// //       <td class="stoc-cell">${product.stoc}</td>
// //     `;

// //     adminTable.appendChild(row);
// //   });
// // };

// // window.addEventListener('DOMContentLoaded', populateAdminTable);





// import { getProducts } from '../../api/getProducts';

// const populateAdminTable = async () => {
//   const products = await getProducts();

//   const adminTable = document.querySelector('.admin-tab');

//   products.forEach((product) => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td class="image-cell"><img src="${product.image}" alt="Product Image"/></td>
//       <td class="name-cell">${product.name}</td>
//       <td class="price-cell">${product.price}</td>
//       <td class="stock-cell">${product.stock}</td>
//     `;

//     adminTable.appendChild(row);
//   });
// };

// window.addEventListener('DOMContentLoaded', populateAdminTable);

// const addProductButton = document.getElementById('add-product-btn');
// const productModal = document.getElementById('product-modal');
// const closeModal = document.getElementsByClassName('close')[0];
// const productForm = document.getElementById('product-form');
// const adminTableBody = document.getElementById('product-table');

// addProductButton.addEventListener('click', () => {
//   productModal.style.display = 'block';
// });

// closeModal.addEventListener('click', () => {
//   productModal.style.display = 'none';
// });

// productForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const image = document.getElementById('image-input').value;
//   const name = document.getElementById('name-input').value;
//   const price = document.getElementById('price-input').value;
//   const stock = document.getElementById('stock-input').value;

//   // Creează un nou rând în tabela admin
//   const newRow = document.createElement('tr');
//   newRow.innerHTML = `
//     <td class="image-cell"><img src="${image}" alt="${name}" /></td>
//     <td class="name-cell">${name}</td>
//     <td class="price-cell">${price}</td>
//     <td class="stock-cell">${stock}</td>
//   `;

//   // Adaugă noul rând în tabela admin
//   adminTableBody.appendChild(newRow);

//   // Resetează valorile câmpurilor formularului
//   productForm.reset();

//   // Ascunde formularul
//   productModal.style.display = 'none';
// });


import { deleteProduct } from "../../utils/admin";

const populateAdminTable = async () => {
    const response = await fetch('https://646e37ec9c677e23218b4c8d.mockapi.io/games');
    const products = await response.json();
  
    const adminTableBody = document.getElementById('product-table');
  
    products.forEach((product) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="image-cell"><img src="${product.image}" alt="Product Image"/> </td>
        <td class="name-cell"><a href="#product-form">${product.name}</a></td>
        <td class="price-cell">${product.price} </td>
        <td class="stock-cell">${product.stoc} </td>
        <td> <button class="delete-button" data-id="${product.id}">X</button> </td>`;
  
      adminTableBody.appendChild(row);
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      deleteProduct(productId);
      });
    });
    
  };
  
  window.addEventListener('DOMContentLoaded', populateAdminTable);
  
  const addProductButton = document.getElementById('add-product-btn');
  const productModal = document.getElementById('product-modal');
  const closeModal = document.getElementsByClassName('close')[0];
  const productForm = document.getElementById('product-form');
  const adminTableBody = document.getElementById('product-table');
  
  addProductButton.addEventListener('click', () => {
    productModal.style.display = 'block';
  });
  
  closeModal.addEventListener('click', () => {
    productModal.style.display = 'none';
  });
  
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const image = document.getElementById('image-input').value;
    const name = document.getElementById('name-input').value;
    const price = document.getElementById('price-input').value;
    const stock = document.getElementById('stock-input').value;
  
    const productData = {
      image,
      name,
      price: parseFloat(price),
      stock: parseInt(stock)
    };
  
    fetch('https://646e37ec9c677e23218b4c8d.mockapi.io/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then(response => response.json())
      .then(data => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td class="image-cell"><img src="${data.image}" alt="Product Image"/></td>
          <td class="name-cell">${data.name}</td>
          <td class="price-cell">${data.price}</td>
          <td class="stock-cell">${data.stock}</td>
        `;
  
        adminTableBody.appendChild(newRow);
        productForm.reset();
        productModal.style.display = 'none';
      })
      .catch(error => {
        console.error(error);
      });
  });
  