// In-memory store — Lab 8 does not connect to a database yet.
let products = [
  { id: 1, name: 'Laptop Dell XPS 15', price: 1499.99, category: 'Electronics', stock: 12 },
  { id: 2, name: 'Wireless Mouse', price: 24.99, category: 'Accessories', stock: 50 },
  { id: 3, name: 'Mechanical Keyboard', price: 89.99, category: 'Accessories', stock: 30 },
];
let nextId = 4;

// @desc    Get all products
// @route   GET /api/products
const getProducts = (req, res) => {
  res.status(200).json(products);
};

// @desc    Search products by name/category
// @route   GET /api/products/search?q=...
const searchProducts = (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();

  if (!q) {
    res.status(400);
    throw new Error('Ju lutem jepni një term kërkimi (?q=...)');
  }

  const results = products.filter(
    (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  res.status(200).json(results);
};

// @desc    Get a single product
// @route   GET /api/products/:id
const getProduct = (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    res.status(404);
    throw new Error(`Produkti me id ${req.params.id} nuk u gjet`);
  }

  res.status(200).json(product);
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = (req, res) => {
  const { name, price, category, stock } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Ju lutem shkruani emrin');
  }

  if (price !== undefined && Number(price) <= 0) {
    res.status(400);
    throw new Error('Çmimi duhet të jetë më i madh se 0');
  }

  if (stock !== undefined && Number(stock) < 0) {
    res.status(400);
    throw new Error('Sasia në stok nuk mund të jetë negative');
  }

  const product = {
    id: nextId++,
    name,
    price: price !== undefined ? Number(price) : 0,
    category: category || 'Uncategorized',
    stock: stock !== undefined ? Number(stock) : 0,
  };

  products.push(product);
  res.status(201).json({ message: 'Produkt i krijuar', data: product });
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    res.status(404);
    throw new Error(`Produkti me id ${req.params.id} nuk u gjet`);
  }

  const { price, stock } = req.body;

  if (price !== undefined && Number(price) <= 0) {
    res.status(400);
    throw new Error('Çmimi duhet të jetë më i madh se 0');
  }

  if (stock !== undefined && Number(stock) < 0) {
    res.status(400);
    throw new Error('Sasia në stok nuk mund të jetë negative');
  }

  Object.assign(product, req.body);
  res.status(200).json({ message: `Produkti ${req.params.id} u përditësua`, data: product });
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    res.status(404);
    throw new Error(`Produkti me id ${req.params.id} nuk u gjet`);
  }

  products = products.filter((p) => p.id !== product.id);
  res.status(200).json({ message: `Produkti ${req.params.id} u fshi` });
};

module.exports = {
  getProducts,
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
