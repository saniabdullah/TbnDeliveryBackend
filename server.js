require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const adminRouter = require('./routes/admin')
const productRoutes = require('./routes/products')
const nomorRouter = require('./routes/nomorWa')
const cors = require('cors')


// express app
const app = express()

app.get('/', (req, res) => {
  res.json({
    hello: 'hi'
  })
})

// cors
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/products', productRoutes)
app.use('/api/admin', adminRouter)
app.use('/api/nomorWa', nomorRouter)


// deploy
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", function(_, res) {
//   res.sendFile(
//     path.join(__dirname, "../frontend/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   )
// })

// connect to db
mongoose.connect("mongodb+srv://abdsani:Barito07@tbndelivery.gwc2bmr.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen("4000", () => {
      console.log('listening for requests on port 4000')
    })
  })
  .catch((err) => {
    console.log(err)
  }) 
