import mongoose from 'mongoose'
import path from 'path'

// import Logo from './../../client/assets/images/sponge.jpg'

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Shop name is required',
    trim: true,
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    default: path.join(__dirname, 'client', 'assests', 'images', 'sponge.jpg'),
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Shop', ShopSchema)
