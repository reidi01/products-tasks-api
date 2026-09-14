const express = require('express');
const router = express.Router();

const {
  getProducts,
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// NOTE: /search must be declared before /:id, otherwise Express
// would treat "search" as an :id value.
router.get('/search', searchProducts);

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
