const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('tiny'))
app.use((req, res, next) =>{
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next()
})
app.use('/dogs', (req, res, next) =>{
    console.log('i love dogs!!');
    next()
})

const verifyPW = (req, res, next) => {
    const { password } = req.query;
    if(password === 'chickennugget'){
        next()
    }
    res.send('sorry you need a pw')
}

app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('Home Page!')
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('woof woof')
})

app.get('/secret', verifyPW, (req, res, next) => {
    res.send('My Secret is : secret')
})

app.use((req, res) => {
    res.status(404).send('not found')
})

app.listen(3000, ()=>{
    console.log('App is running on localhost:3000');
})