const mongoose = require("mongoose");
const Todo = require("./todo");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
//   desc: {
//     type: String,
//   },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});
module.exports = mongoose.models?.User || mongoose.model("User", UserSchema);
