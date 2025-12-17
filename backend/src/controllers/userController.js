import User from '../models/User.js';
import Wallet from '../models/Wallet.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;


    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: 'Email đã được sử dụng' });


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = await User.create({ email, password: hashedPassword });


    await Wallet.create({ user: newUser._id});

    res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email không tồn tại' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Sai mật khẩu' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Đăng nhập thành công',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// ✅ Lấy danh sách tất cả user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // ẩn password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Lấy thông tin 1 user theo ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User không tồn tại' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name, avatar, dateOfBirth } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        avatar,
        dateOfBirth,
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại' });
    }

    res.json({
      message: 'Cập nhật thành công',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
  }
};

// ✅ Tạo mới user
export const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // nếu fullname trống thì tự đặt bằng đoạn đầu email
    const nameFromEmail = email.split('@')[0];

    const newUser = new User({
      email,
      password,
      name: name || nameFromEmail,
      role: role || 'user',
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Cập nhật user
export const updateUser = async (req, res) => {
  try {
    const { name, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, role },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ message: 'User không tồn tại' });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Xóa user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User không tồn tại' });

    res.status(200).json({ message: 'Xóa user thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
