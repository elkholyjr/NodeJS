const express= require('express');
const path= require('node:path');
const fs= require('fs/promises');
const app= express();

//1
app.post("/AddUser",express.json(),async(req,res)=>{
    users = await fs.readFile("./users.json",{encoding:"utf-8"});
    users = JSON.parse(users);
    const idx= users.findIndex((user)=>{
        if(user.email === req.body.email){
            return true;
        }
    });
    if(idx !== -1){
        res.json({message:"user already there", success:false});
    }else{
        users.push(req.body);
        users= JSON.stringify(users);
        await fs.writeFile("./users.json", users);
        res.json({message:"user Added successfully", success:true});
    }
});

//2
app.patch("/UpdateUser/:id",express.json(),async(req,res)=>{
    const id= req.params.id;
    users = await fs.readFile("./users.json",{encoding:"utf-8"});
    users = JSON.parse(users);
    const idx= users.findIndex((user)=>{
        if(user.id === parseInt(id)){
            return true;
        }
    });
    if(idx === -1){
        res.json({message:"user not there", success:false});
    }else{
        Object.assign(users[idx],req.body);
        users= JSON.stringify(users);
        await fs.writeFile("./users.json", users);
        res.json({message:"user updated successfully", success:true});
    }
});

//3
app.delete("/DeleteUser/:id",express.json(),async(req,res)=>{
    const id= req.params.id || req.body.id;
    users = await fs.readFile("./users.json",{encoding:"utf-8"});
    users = JSON.parse(users);
    const idx= users.findIndex((user)=>{
        if(user.id === parseInt(id)){
            return true;
        }
    });
    if(idx === -1){
        res.json({message:"user not there", success:false});
    }else{
        users.splice(idx,1);
        users= JSON.stringify(users);
        await fs.writeFile("./users.json", users);
        res.json({message:"user deleted successfully", success:true});
    }
});

//4
app.get("/GetUser/getByName",express.json(),async(req,res)=>{
    const {name}= req.query;
    users = await fs.readFile("./users.json",{encoding:"utf-8"});
    users = JSON.parse(users);
    const idx= users.findIndex((user)=>{
        if(user.name === name){
            return true;
        }
    });
    if(idx === -1){
        res.json({message:"user not there", success:false});
    }else{
        res.json({message:"user found",user: users[idx] ,success:true});
    }
});

//5
app.get("/GetAllUsers",async(req,res)=>{
    users = await fs.readFile("./users.json",{encoding:"utf-8"});
    users = JSON.parse(users);
    res.json({message:"users",users: users,success:true});
});

//6
app.get("/GetUsers/minAge",express.json(),async(req,res)=>{
    const {age} = req.query;
    console.log(age);
    users = await fs.readFile("./users.json",{encoding:"utf-8"});
    users = JSON.parse(users);
    users= users.filter(user => user.age > parseInt(age))
    if(users.length === 0 ){
        res.json({message:"users not there", success:false});
    }else{
        res.json({message:"users found",users: users ,success:false});
    }
});

//7
app.get("/GetUser/:id",express.json(),async(req,res)=>{
    const id= req.params.id;
    users = await fs.readFile("./users.json",{encoding:"utf-8"});
    users = JSON.parse(users);
    const idx= users.findIndex((user)=>{
        if(user.id === parseInt(id)){
            return true;
        }
    });
    if(idx === -1){
        res.json({message:"user not there", success:false});
    }else{
        res.json({message:"user found", user: users[idx], success:true});
    }
});

app.listen(3000,
    ()=>{
        console.log("server is running on port 3000");
    }
)