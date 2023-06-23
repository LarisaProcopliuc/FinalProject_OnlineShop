import { getProductById } from '../../api/getProductById';
import '../cart/style.css';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductFromCart,	
} from '../../utils/cart';

const showProducts = async () => {
	let cartArray = JSON.parse(localStorage.getItem('cart')) || [];
	const sortedProductsById = cartArray.sort(
	  (product1, product2) => product1.id - product2.id
	);
  
	const cartContainer = document.getElementById('cart');
	cartContainer.innerHTML = '';
  
	const table = document.createElement('table');
	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');
  
	const headerRow = document.createElement('tr');
	headerRow.innerHTML = `
	  <th>Product Name</th>
	  <th>Price</th>
	  <th>Quantity</th>
	  <th>Delete</th>
	`;
	thead.appendChild(headerRow);
  
	sortedProductsById.forEach(async (product) => {
	  const productInfo = await getProductById(product.id);
  
	  const productRow = document.createElement('tr');
	  productRow.innerHTML = `
		<td>
		  <a href="/src/pages/details/details.html?id=${product.id}">
			${productInfo.name}
			<img src="${productInfo.image}" width="30px" alt="Product Image" />
		  </a>
		</td>
		<td>${productInfo.price}</td>
		<td>
		  <button class="decrement-quantity" data-product-id="${product.id}">-</button>
		  ${product.quantity}
		  <button class="increment-quantity" data-product-id="${product.id}">+</button>
		</td>
		<td>
		  <button class="remove-product" data-product-id="${product.id}">X</button>
		</td>
	  `;
	  tbody.appendChild(productRow);
	});
	
	table.appendChild(thead);
	table.appendChild(tbody);
	cartContainer.appendChild(table);
  };

window.addEventListener('load', showProducts);

document.getElementById('cart').addEventListener('click', async (e) => {
	const cartArray = JSON.parse(localStorage.getItem('cart'));
	const productId = e.target.dataset.productId;
  
	if (e.target.classList.contains('decrement-quantity')) {
	  const product = cartArray.find((item) => item.id === productId);
	  if (product.quantity > 0) {
		decrementProductQuantity(productId, cartArray);
	  }
	} else if (e.target.classList.contains('increment-quantity')) {
	  incrementProductQuantity(productId, cartArray);
	} else if (e.target.classList.contains('remove-product')) {
	  removeProductFromCart(productId, cartArray);
	}
  
	localStorage.setItem('cart', JSON.stringify(cartArray));
	await showProducts();
  });	

