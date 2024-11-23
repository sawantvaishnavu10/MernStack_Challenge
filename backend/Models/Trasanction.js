const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date,
  sold: Boolean,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
// router.get('/transactions', async (req, res) => {
//     try {
//       const { month, search = '', page = 1, perPage = 10 } = req.query;
  
//       // Simple search query example
//       const regex = new RegExp(search, 'i');
//       const dateFilter = month ? { $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] } } : {};
  
//       const transactions = await Transaction.find({
//         $and: [
//           dateFilter,
//           { $or: [{ title: regex }, { description: regex }, { price: { $regex: regex } }] },
//         ],
//       })
//         .skip((page - 1) * perPage)
//         .limit(parseInt(perPage));
  
//       const totalCount = await Transaction.countDocuments({
//         $and: [
//           dateFilter,
//           { $or: [{ title: regex }, { description: regex }, { price: { $regex: regex } }] },
//         ],
//       });
  
//       res.status(200).json({ transactions, count: totalCount });
//     } catch (error) {
//       console.error('Error fetching transactions:', error);  // Log the error to see details
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });