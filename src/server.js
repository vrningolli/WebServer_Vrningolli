const geoCode=require('./utils/geocode')
const weatherCode=require('./utils/forecast')
const chalk=require('chalk')
const path=require("path")
const hbs=require("hbs")
const express=require('express');
const app=express();
const port=process.env.PORT
// define paths for express config
const partialPath=path.join(__dirname,'./partials')
const newPathName=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'./template')
//setup static directory to serve
app.use(express.static(newPathName))
//Setup handlebar engine and views location
hbs.registerPartials(partialPath);
app.set('view engine','hbs')
app.set('views',viewsPath)
// The rest of the programm
app.get('',(req,res)=>{
res.render('index',{
    title:"Home",
    homeText:"This is some home text",
    name:"V R Ningolli"
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        aboutText:"This is some about text",
        name:"V R Ningolli"
    })  
})  
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        helpText:"This is some helpful text",
        name:"V R Ningolli"
    })   
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("Enter the proper Address query!!") 
      }
      console.log(req.query)
      res.send(req.query.address);
})  
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send("Enter the proper query!!")
    }
    geoCode(req.query.search,(error,{latitude,longitude,location}={})=>{
        if (error){
            return  res.send({error})
        }
        weatherCode(latitude,longitude,(error,data)=>{
            if (error){
                return  res.send({error});
            }
            console.log(location);
            console.log(chalk.green.inverse(data))
            res.send({
                location,
                "Climate":data,
                Address:req.query.search
            }
            );   
        })
    })
})
app.get('/help/*',(req,res)=>{    
    res.render('helperror',{
        title:"The Help Error",
        name:"V R Ningolli"
     })
})
app.get('*',(req,res)=>{   
    res.render('404Error',{
        title:"The 404 Error Page",
        name:"V R Ningolli"
    })
})
app.listen(port,()=>{
    console.log("Server is up and running!! in "+port);
})