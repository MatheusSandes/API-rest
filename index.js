const express= require("express");
const Games= require("./database/Game");
const connection= require("./database/database")
const app= express();
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//database
connection
    .authenticate()
    .then(() =>{
        console.log("conexão ok!");
    }).catch((error)=>{
        console.log("ERRO");
    })
    
app.get("/games", (req, res)=>{
    Games.findAll().then(game =>{
        res.json(game);
        res.statusCode=200;
    });
})

app.get("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id= parseInt(req.params.id);
        Games.findOne({ 
            where: {id: id}
        }).then(game=>{
            if(game!= undefined){
                res.statusCode= 200;
                res.json(game);
            }else{
                res.sendStatus(404);
            }
        })
    }
})

app.post("/game", (req,res)=>{
    var {title, year}=req.body;
    if(!isNaN(title)|| isNaN(year)){
        res.sendStatus(400);
    }else{
        Games.create({
            title: title,
            year: year
        }).then(()=>{
            res.sendStatus(200);
        })
    }
})
app.delete("/game/:id", (req, res)=>{
    var id= req.params.id;
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id= parseInt(req.params.id);
        Games.findByPk(id).then(game =>{
            if(game !=undefined){
                game.destroy({ 
                    where: {id: id}
                }).then(()=>{
                    res.sendStatus(200); 
                })
            }else{
                res.sendStatus(404);
            }
        })
    }
})

app.put("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id= parseInt(req.params.id);
        Games.findOne({ 
            where: {id: id}
        }).then(game=>{
            if(game!= undefined){
                var {title, year}=req.body;
                game.update({title:title, year:year},{
                    where:{
                        id: id
                    }
                }).then(()=>{
                    res.sendStatus(200);
                })
            }else{
                res.sendStatus(404);
            }
        })
    }
})


app.listen(45678, ()=>{
    console.log("API rodando")
})
