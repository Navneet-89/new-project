const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { ParseStatus } = require('zod');
const { todo } = require('./db');
const port = 3000;
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.post("/todo",async function(req,res){
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
    });

app.get("/todos",async function(req,res){
        const todos = await todo.find({});
        res.json({
            todos:[]
        })
    });
app.put("/completed",async function(req,res){
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
            msg: "Todo marked as completed",
        })

    });

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});