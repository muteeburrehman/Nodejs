const express = require('express')
const app = express();
const logger=require('./logger')
const authorize=require('./authorize')
// req => middleware => res

// 1. use vs route
// 2. options - our own / express / third party
//app.use('/api',logger) --->works on all api get methods
//app.use('/api',logger)//works on those 'app.get' methods who have '/api' in their arguments.
app.use([logger,authorize])
// api/home/about/products
 // When you are working with middleware,you must pass 'next' middleware.
 // Either you passed your own response or pass the next middleware
app.get('/',(req,res)=>{

    res.send('Home')
})
app.get('/about',(req,res)=>{

    res.send('About')
})
app.get('/api/products',(req,res)=>{

    res.send('Products')
})
app.get('/api/items',logger,(req,res)=>{
    console.log(req.user)
    res.send('Items')
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
