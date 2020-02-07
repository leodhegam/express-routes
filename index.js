const express = require ('express');
const server = express();

server.use(express.json());

//Query params = ?teste=1
//Routes params = /users/1
//Request body = {"name": "Leonardo", "email":"leonardo_dhegam@hotmail.com"}

function checkUserExists(req,res,next){
    if(!req.body.name){
        return res.status(400).json({error : 'User name is required'});
    }
    return next();
}

function checkUserInArray(req,res,next){
    if(!users[req.params.index]){
        return res.status(400).json({error : 'User does not exists'});
    }
    return next();
}

server.get('/users',(req,res)=> {
    return res.json(users);
})

server.get('/users/:index',checkUserInArray,(req,res)=> {
    const {index} = req.params;
    return res.json(users[index]);
})

server.post('/users',checkUserExists,(req,res)=>{
    const {name} = req.body;

    users.push(name);
    return res.json(users);
})

server.put('/users/:index',checkUserInArray,checkUserExists,(req,res)=>{
    const {name} = req.body;
    
    users[index] = name;
    return res.json(users);
})

server.delete('/users/:index',checkUserInArray, (req,res)=>{
    const {index} = req.params;
    users.splice(index,1);
    return res.json();
})

server.listen(3333);