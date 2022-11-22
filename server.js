const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const toyService = require('./services/toy.service')

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

const corsOptions = {
   origin: ['http://127.0.0.1:8080', 
   'http://localhost:5173',
   'http://127.0.0.1:3000', 
   'http://localhost:3000'],
   credentials: true
   }
   app.use(cors(corsOptions))

//LIST
app.get('/api/toy', (req, res) => {
   console.log('HELLo')
   var { name,label,sort,inStock} = req.query
   const filterBy = {
      name: name || '',
      label: label || '',
      sort: sort || 'none',
      inStock: JSON.parse(inStock),
   }
   toyService.query(filterBy)
      .then(toys => {
         res.send(toys)
      })
      .catch((err) => {
         console.log('OOPS:', err)
         res.status(400).send('Cannot load toys')
      })
})

//ADD
app.post('/api/toy/', (req, res) => {
   const { name, price, labels } = req.body
   const toy = {
      name,
      price,
      labels,
      inStock:true,
      createdAt: Date.now(),
      
   }
   toyService.save(toy)
      .then(savedToy => {
         console.log(savedToy)
         res.send(savedToy)
      })
      .catch((err) => {
         console.log('OOPS:', err)
         res.status(400).send('Cannot save toy')
      })
})


//UPDATE
app.put('/api/toy/:toyId', (req, res) => {
   const { _id, name, price, labels  } = req.body

   const toy = {
      _id,
      name,
      price,
      labels,
      inStock,
      createdAt: Date.now(), 
   }
   toyService.save(toy)
      .then(savedToy => {
         res.send(savedToy)
      })
      .catch((err) => {
         console.log('OOPS:', err)
         res.status(400).send('Cannot save toy')
      })
})

//READ
app.get('/api/toy/:toyId', (req, res) => {
   const { toyId } = req.params
   toyService.getById(toyId)
      .then(toy => {
         res.send(toy)
      })
      .catch((err) => {
         console.log('OOPS:', err)
         res.status(400).send('Cannot load toys')
      })
})
//DELETE

app.delete('/api/toy/:toyId', (req, res) => {
   const { toyId } = req.params
   toyService.remove(toyId)
      .then(() => {
         res.send('Removed!!')
      })
      .catch((err) => {
         console.log('OPS: ', err)
         res.status(404).send('Unkown toy')
      })
})

const port = process.env.PORT || 3030
app.listen(port, () => {
   console.log('Server ready at port ' + port)
})

