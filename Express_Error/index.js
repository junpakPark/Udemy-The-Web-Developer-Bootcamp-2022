const express = require('express');
const app = express();
const morgan = require('morgan')
const AppError = require('./AppError')

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
    // res.send('sorry you need a pw')
    throw new AppError('Password required', 401);
}

app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('Home Page!')
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('woof woof')
})

app.get('/secret', verifyPW, (req, res, next) => {
    res.send('My Secret is : secret')
})

app.get('/admin',(req, res) => {
    throw new AppError('You are not an admin!', 403)
})

app.use((req, res) => {
    res.status(404).send('not found')
})

// app.use((err, req, res, next)=>{
//     console.log("**********************************")
//     console.log("***************ERROR**************")
//     console.log("**********************************")
//     // console.log(err)
//     // res.status(500).send("OH BOY, WE GOT AN ERROR!!")
//     next(err)
// })

app.use((err, req, res, next)=>{
    const { status = 500, message = 'Something went Wrong' } = err;
    res.status(status).send(message)
})

app.listen(3000, ()=>{
    console.log('App is running on localhost:3000');
})