const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const gameRoutes = require('./routes/gameRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const walletRoutes = require('./routes/walletRoutes.js');
const purchaseRoutes = require('./routes/purchaseRoutes.js');
const connectDB = require('./config/database.js');
const app = express();
const cors=require('cors')
dotenv.config();
connectDB();
const PORT = 3000;

app.use(cors())
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/purchases', purchaseRoutes);


app.get('/', (req, res) => {
  res.send('✅ Backend Node.js đang hoạt động!');
}); 


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
