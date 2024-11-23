const express = require('express');
const Transaction = require('../Models/Trasanction');
const router = express.Router();

// Initialize Database
router.get('/initialize', async (req, res) => {
  const axios = require('axios');
  const dataUrl = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
  try {
    const { data } = await axios.get(dataUrl);
    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(data); // Seed new data
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error initializing database', details: error });
  }
});

// List Transactions (with search and pagination)
router.get('/transactions', async (req, res) => {
  const { search = '', page = 1, perPage = 10, month } = req.query;
  const regex = new RegExp(search, 'i');
  const dateFilter = month ? { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } } : {};
  try {
    const transactions = await Transaction.find({
      $and: [
        dateFilter,
        { $or: [{ title: regex }, { description: regex }, { price: { $regex: regex } }] },
      ],
    })
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    const count = await Transaction.countDocuments(dateFilter);
    res.status(200).json({ transactions, count });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Statistics API
router.get('/statistics', async (req, res) => {
  const { month } = req.query;
  const dateFilter = { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } };
  try {
    const totalSale = await Transaction.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, totalSale: { $sum: { $cond: ['$sold', '$price', 0] } } } },
    ]);
    const totalSold = await Transaction.countDocuments({ ...dateFilter, sold: true });
    const totalNotSold = await Transaction.countDocuments({ ...dateFilter, sold: false });
    res.status(200).json({
      totalSale: totalSale[0]?.totalSale || 0,
      totalSold,
      totalNotSold,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Bar Chart API
router.get('/bar-chart', async (req, res) => {
  const { month } = req.query;
  const dateFilter = { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } };
  try {
    const barChart = await Transaction.aggregate([
      { $match: dateFilter },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          default: '901-above',
          output: { count: { $sum: 1 } },
        },
      },
    ]);
    res.status(200).json(barChart);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Pie Chart API
router.get('/pie-chart', async (req, res) => {
  const { month } = req.query;
  const dateFilter = { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } };
  try {
    const pieChart = await Transaction.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    res.status(200).json(pieChart);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Combined API
router.get('/combined', async (req, res) => {
  const { month } = req.query;
  try {
    const [statistics, barChart, pieChart] = await Promise.all([
      Transaction.find('/statistics', { month }),
      Transaction.find('/bar-chart', { month }),
      Transaction.find('/pie-chart', { month }),
    ]);
    res.status(200).json({ statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ error });
  }
});



module.exports = router;
