const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
          firstname: {
               type: String,
               require: true
          },
          lastname: {
               type: String,
               require: true
          },
          email: {
               type: String,
               require: true,
               unique: true,
          },
          password: {
               type: String,
               rquire: true,
          },
          code: {
               type:Number,
               rquire: true
          },
          phonenumber : {
               type: Number,
               require: true,
               unique: true,
          },
          username : {
               type: String,
               min: 3,
               max:50
          },
          userphoto: {
               type: String,
               default: ''
          },
          friends: {
               type: Array,
               default: ['6305fde2304ff4b05dca3dba']
          },
          isAdmin: {
               type: Boolean,
               default: false
          }
     },
     {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);