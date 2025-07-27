import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, supplierId: req.user.id });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().populate('productId').populate('supplierId', 'fullName');
  res.json(orders);
};
