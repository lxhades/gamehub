const mongoose =require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://lxhades2004_db_user:hLFD8Xq1KuyGPf4O@cluster0.yk8iqw8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Không kết nối được database:', error);
  }
};

module.exports =connectDB ;
