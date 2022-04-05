const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    expires_at: {
      type: Date,
      // default: () => Date.now(),
    },
    nested_todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
    
    // { type: [Todo], ref: "Todo" },
    desc: String,
    checked:Boolean
  },

  { collection: "todos" }
);
//   const ProductCategory = mongoose.model('ProductCategory', categorySchema);
// const productCategory = new ProductCategory({
//   name: "Salon",
//   desc:""
// })
// require("dotenv").config();
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => {console.log("connected to mongoose")
// mongoose.model("Todo", todoSchema).create({title:'todo1',expires_at:new Date(1649235233)});

// });
module.exports = mongoose.models?.Todo || mongoose.model("Todo", todoSchema);