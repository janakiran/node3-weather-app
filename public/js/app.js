// fetch('https://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const latitude = document.querySelector('.latitudeValue')
const longitude = document.querySelector('.longitudeValue')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'Loading ...'
message2.textContent = ''

weatherForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    const url = 'http://localhost:3000/weather?lat='+latitude.value+'&long='+longitude.value+'&key=3d15c90b9ac54828be2102421241902'
    
    fetch(url).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                message1.textContent = data.error
            }else{
                console.log(data)
                message1.textContent = data.location
                message2.textContent = data.forecast
                // console.log(data.forecast)
                // console.log(data.location)
            }
        })
    })
})



