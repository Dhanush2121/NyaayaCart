import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['vendor', 'supplier'], required: true },
  phone: String,
  profilePicture: String
}, { timestamps: true });

export default mongoose.model('User', userSchema);
