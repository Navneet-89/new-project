const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { ParseStatus } = require('zod');
const { todo } = require('./db');
const port = 3000;
const app = express();

app.use(express.json());

app
   
    .post("/todo",async function(req,res){
        const createPayload = req.body;
        const parsePayload = createTodo;
        if(!parsePayload.success){
            res.status(411).json({
                msg: "You sent wrong inputs",
            })
            return;
        }
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        })

        res.json({
            msg: "Todo created"
        })
    })
    .get("/todos",async function(req,res){
        const todos = await todo.find({});
        res.json({
            todos
        })
    })
    .put("/completed",async function(req,res){
        const updatePayload = req.body;
        const parsePayload = updateTodo.safeParse(updatePayload);
        if(!parsePayload.success){
            res.status(411).json({
                msg: "You sent wrong inputs",
            })
            return;
        }
        await todo.update({
            _id: req.body.id
        },{
            completed: true
        })
        res.json({
            msg: "Todo marked as completed"
        })

    })

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});