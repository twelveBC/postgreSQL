const express =  require('express')
const app =  express()
const port = 3000
const adminRouter = require("./route/admin")
const session = require("express-session")

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    })
);
app.use(express.urlencoded({ extended : true })) //It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views')); // initialitation path 

app.use(adminRouter)
app.get("/",(req,res) => {
    res.redirect("login")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`)
})