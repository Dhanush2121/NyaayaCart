import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, vendorId: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find().populate('vendorId', 'fullName email');
  res.json(products);
};
