const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { log } = require('console')

// Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render("index", {
        title: "Home",
        name: "kiran"
    })
})

app.get('/about', (req, res) =>{
    res.render("about", {
        title: "About",
        name: "kiran"
    })
})

app.get('/help', (req, res) =>{
    res.render("help", {
        message: "Some message.", 
        title: "Help",
        name: "kiran jana"
    })
})

// No longer needed due to use is pointing to index.html by default.
// app.get('', (req, res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res)=>{
//     res.send("Help Page")
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About page</h1>')
// })

app.get('/weather', (req, res)=>{

    if(! req.query.lat || ! req.query.long){
        return res.send({
            error: "You must provide both latitude and longitude values."
        })
    }
    // console.log(req.query.lat, req.query.long)
    geocode(req.query.lat, req.query.long, (error, {latitude, longitude} ={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, {forecast, location, localtime}) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecast,
                location: location,
                localtime: localtime
            })
        })
    })

})

// app.get('/products', (req, res)=>{
    
//     if(! req.query.address){
//        return res.send({
//         error: "You must provide a address term."
//        })
//     }

//     res.send({
        
//         forcast: "The outside temperature is 30 degree celisius and 0% chance for rain.",
//         location: {
//             latitute: 20,
//             longitute: -43.1,
//             name: req.query.address
//         }
//     })
// })

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: "404",
        name: "Kiran Jana",
        errorMessage: "Help article not found."
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Kiran Jana",
        errorMessage: "Page Not found"
    })  
})

app.listen(port, ()=>{
    console.log('Server is up and running at port number ' + port)
})

// enter nodemon src/app.js -e js,hbs to include changes in js and hbs also.