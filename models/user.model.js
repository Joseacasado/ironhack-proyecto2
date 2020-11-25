const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({
  username: String,
  password: String,
  fullname: String,
  email: String,
  avatar: { type: String, default: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png' },
  isAdmin: { type: Boolean, default: false },
  events_id: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User