
import { deleteProduct } from "../../utils/admin";
import { resetForm } from "../../utils/admin";

const populateAdminTable = async () => {
    const response = await fetch('https://646e37ec9c677e23218b4c8d.mockapi.io/games');
    const products = await response.json();
  
    const adminTableBody = document.getElementById('product-table');
  
    products.forEach((product) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="image-cell"><img src="${product.image}" alt="Product Image"/> </td>
        <td class="name-cell"><a href="#" class="product-link">${product.name}</a></td>
        <td class="price-cell">$ ${product.price}</td>
        <td class="stock-cell">${product.stock}</td>
        <td class="delete-cell"><button class="delete-button" data-id="${product.id}">X</button></td>`;
    
      const productLink = row.querySelector('.product-link');
      productLink.addEventListener('click', (e) => {
        e.preventDefault();
        openProductForm(product);
      });
    
      adminTableBody.appendChild(row);
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.id;
      deleteProduct(productId);
      });
    });
    console.log(products)
  };
  
  window.addEventListener('DOMContentLoaded', populateAdminTable);
  
  const addProductButton = document.getElementById('add-product-btn');
  const productModal = document.getElementById('product-modal');
  const closeModal = document.getElementsByClassName('close')[0];
  const productForm = document.getElementById('product-form');
  const adminTableBody = document.getElementById('product-table');
  
  addProductButton.addEventListener('click', () => {
      addProductButton.addEventListener('click', () => {
      productForm.reset();
      productModal.style.display = 'block';
      resetForm();
    });
    
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
  
  const openProductForm = (product) => {
    productModal.style.display = 'block';
  
    const imageInput = document.getElementById('image-input');
    const nameInput = document.getElementById('name-input');
    const priceInput = document.getElementById('price-input');
    const stockInput = document.getElementById('stock-input');
    const descriptionInput = document.getElementById('description-input');
    const formTitle = document.getElementById('form-title');
    const addFormButton = document.getElementById('add-form');
  
    // Completează câmpurile cu datele produsului
    imageInput.value = product.image;
    nameInput.value = product.name;
    priceInput.value = product.price;
    stockInput.value = product.stock;
    descriptionInput.value = product.details;
    formTitle.textContent = 'Edit the product';
    addFormButton.textContent = 'Save';
  };

