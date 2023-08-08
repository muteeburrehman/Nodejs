const express = require('express');
const app = express();

const people = require('./routes/people')
const auth = require('./routes/auth')
// static assets
app.use(express.static('./methods-public'));
// parse from data
app.use(express.urlencoded({ extended: false }));
// parse join
app.use(express.json());

app.use('/api/people',people)
app.use('/login',auth)
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' });
    }

    res.status(201).send({ success: true, person: name });
});

app.post('/api/people/postman',(req,res)=>{
    const {name} = req.body

    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' });
    }
    res.status(201).send({success: true, data: [...people,name]})
})
app.put('/api/people/:id',(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    //console.log(id,name)
    //res.send('hello word')
    const person = people.find((person)=>person.id === Number(id))
    if (!person) {
        return res.status(400).json({ success: false, msg: `no person with id ${id}` });

    }
    const newPeople = people.map((person)=>{
        if (person.id===Number(id)){
            person.name=name
        }
        return person
    })
    res.status(200).json({success:true,data:newPeople})
})

app.delete('/api/people/:id',(req,res)=>{
    const person = people.find((person)=>person.id === Number(req.params.id))
    if (!person) {
        return res.status(400).json({ success: false, msg: `no person with id ${req.params.id}` });

    }
    const newPeople=people.filter((person)=>person.id !==Number(req.params.id))
    return res.status(200).json({success:true,data:newPeople})
})
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
