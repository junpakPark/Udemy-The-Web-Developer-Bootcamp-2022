const express = require('express')

const app = express()

// app.use((req, res)=>{
//     console.log("We Got a New Requset!!")
//     // res.send({
//     //     color: 'red'
//     // })
//     res.send('<h1>This is my Webpage</h1>')
// })
app.get('/', (req,res)=>{
    console.log("Home Request!")
    res.send("This is the home")
})

app.get('/r/:subreddit', (req,res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
})

app.get('/r/:subreddit/:postId', (req,res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${ postId } on the ${subreddit} subreddit </h1>`);
})

app.post('/cats', (req,res)=>{
    console.log("Post Request to /cat!")
    res.send("Meowwww!")
})

app.get('/cats', (req,res)=>{
    console.log("Cat Request!")
    res.send("Meowwww!")
})

app.get('/dogs', (req,res)=>{
    console.log("Dog Request!")
    res.send("Woof!")
})

app.get('/search', (req,res) => {
    const { q } = req.query;
    if(!q){
        res.send('Nothing Found if nothing searched')
    }
    res.send(`<h1>Search results for: ${q}</h1>`)
})

app.get('*', (req,res) => {
    res.send(`I don't Know that Path`)
})


app.listen(8080, ()=>{
    console.log("Listening on port 8080!")
})