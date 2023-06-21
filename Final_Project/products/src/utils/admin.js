import { productsURL } from '../constans';

export const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${productsURL}/${productId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Șterge rândul corespunzător din tabel
        const rowToDelete = document.querySelector(`.delete-button[data-id="${productId}"]`).parentNode.parentNode;
        rowToDelete.remove();
      } else {
        console.log('Error deleting product');
      }
    } catch (error) {
      console.log('Error deleting product', error);
    }
  };