const mongoose = require("mongoose");
 
mongoose.connect("mongodb+srv://kirags123:8qPEa8KYKBEh2bss@cluster0.f3qlbup.mongodb.net/todos")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})
const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}