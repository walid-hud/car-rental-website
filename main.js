const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

const posts = [
{
    id: 1,
    title: 'First Post',
    content: 'This is the content of the first post.'
},
{
    id: 2,
    title: 'Second Post',
    content: 'This is the content of the second post.'
},
{
    id: 3,
    title: 'Third Post',
    content: 'This is the content of the third post.'
}]
app.use(express.static(path.join(__dirname , 'public' , 'images')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views',  'index.html'));
});

app.get('/posts/:id' , (req ,res)=>{
    const result = posts.filter(post => post.id === Number(req.params.id) )
    
    result.length == 0 ? res.write(JSON.stringify({error:'nothing found'})) : res.write(JSON.stringify(result))  
    res.end()
})

app.get('/search' , (req , res)=>{
    const limit = parseInt(req.query.limit)
    if(30 < limit , limit < 10){
        res.write(JSON.stringify({error:'limit unmatched'}))
        res.end()
    }
    res.write(`<h1>limit :${limit} </h1>`)
    res.end()
})



app.listen(process.env.PORT, (err) => {
    console.log(`app running on http://localhost:${process.env.PORT}`);
});
