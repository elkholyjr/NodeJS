const http = require('http');
const fs = require('fs');
const path = require('path');

const server= http.createServer(handler);

function handler(req,res){
    const {url,method} = req;
    let body= '';
    if(url==='/AddUser' && method ==='POST'){
        req.on("data",(chunk)=>{
            body+=chunk;
        });

        req.on("end",()=>{
            body= JSON.parse(body);
            let data= fs.readFileSync(path.join(__dirname,"Users.json"),{encoding:'utf-8'});
            data= JSON.parse(data);

            for (const user of body){
                const exist= data.some(
                    exUser => exUser.email === user.email
                );
                if(!exist){
                    data.push(user);
                }else{
                    res.write(JSON.stringify({message:"User already exists",success:false}));
                    res.end();
                    return;
                }
            }

            data= JSON.stringify(data);
            fs.writeFileSync(path.join(__dirname,"Users.json"),data, {flag:'w'}, (err)=>{
              err && console.log(err);
            });

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message:"done",success:true}));
            res.end();  
        });

    }
    else if(url.startsWith('/PATCH/user/') && method ==='PATCH'){
        const id= url.split('/')[3];
        let data= fs.readFileSync(path.join(__dirname,"Users.json"),{encoding:'utf-8'});
        data= JSON.parse(data);
        usr= data.filter(user=> user.ID === Number(id));
        if(usr.length === 0){
            res.write(JSON.stringify({message:"User ID not found",success:false}));
            res.end();
        }else{
            let body= "";
            req.on("data",(chunk)=>{
                body+=chunk;
            });
            req.on("end",()=>{
                body= JSON.parse(body);

                Object.assign(usr[0], body);
                fs.writeFileSync(path.join(__dirname, "Users.json"),JSON.stringify(data));

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message:"User updated!",success:true}));
                res.end();
            });
        }
    }
    else if(url.startsWith('/DELETE/user/') && method ==='DELETE'){
        const id= url.split('/')[3];
        let data= fs.readFileSync(path.join(__dirname,"Users.json"),{encoding:'utf-8'});
        data= JSON.parse(data);
        data= data.filter(user=> user.ID === Number(id));
        if(data.length === 0){
            res.write(JSON.stringify({message:"User ID not found",success:false}));
            res.end();
        }else{
            fs.writeFileSync(path.join(__dirname,"Users.json"),JSON.stringify(data), {flag:'w'}, (err)=>{
                err && console.log(err);
            });

            res.write(JSON.stringify({message:"Deleted the user!",success:true}));
            res.end();
        }
    }
    else if(url==='/AllUsers' && method ==='GET'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        
        let data= fs.readFileSync(path.join(__dirname, "Users.json"),{encoding:'utf-8'});
        data= JSON.parse(data);
        res.write(JSON.stringify({message:"done",success:true, data:data}));
        res.end();
    }
    else if(url.startsWith('/GET/user/') && method ==='GET'){
        const id= url.split('/')[3];
        let data= fs.readFileSync(path.join(__dirname,"Users.json"),{encoding:'utf-8'});
        data= JSON.parse(data);
        usr= data.filter(user=> user.ID === Number(id));
        if(usr.length === 0){
            res.write(JSON.stringify({message:"User ID not found",success:false}));
            res.end();
            return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message:"done",success:true, data:usr[0]}));
        res.end();
    }else{
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.write(JSON.stringify({message:"Invalid Request!!", success: false}));
        res.end();
    }
}

server.listen(3000,
  ()=> console.log("server is running on port 3000")
);
