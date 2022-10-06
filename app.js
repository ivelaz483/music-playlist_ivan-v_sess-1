const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const methodOverride = require('method-override')

const app = express();

mongoose.connect('mongodb://localhost:27017/playlist');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

const port = 3000;

const User = require("./model/user")

app.set("view engine", "ejs");

app.use(express.static('public'));

/*app.get ('/' , (req , res)=>{
    res.render("show");
})*/

app.get ('/form' , (req , res)=>{
    res.render("form");
})

app.post('/form',  async(req, res) =>{
    const data = new User(req.body)
   await data.save()
   res.send("Save Data")
})

app.get('/', async(req,res)=>{
    const items = await User.find({})
    res.render('show', {items :items})
})

app.get('/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const items = await User.findById(id)
    res.render('edit', {items})
})

app.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const items = await User.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    res.redirect('/')
})

app.delete('/:id', async(req,res)=> {
    const {id} = req.params
    const deleteItem = await User.findOneAndDelete(id)
    res.redirect("/")   
})

app.get('/search', async(req,res)=>{
    const items = await User.find({})
    res.render('search', {items :items})
})

app.get('/search:id/edit', async(req,res)=>{
    const {id} = req.params;
    const items = await User.findById(id)
    res.render('edit', {items})
})

app.put('/search:id', async(req,res)=>{
    const {id} = req.params;
    const items = await User.findByIdAndUpdate(id, req.body ,{runValidors :true , new :true})
    res.redirect('/search')
})

app.delete('/search:id', async(req,res)=> {
    const {id} = req.params
    const deleteItem = await User.findOneAndDelete(id)
    res.redirect("/search")   
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
}) 