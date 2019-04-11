const request = require('request')


const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/8b485b42637e8b0f954529657961b53e/'+latitude+','+longitude 
    
    request({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect the weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location!', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out. This is the high temperature today: '+ body.daily.data[0].temperatureHigh + ' and the low: '+ body.daily.data[0].temperatureLow +'.' + 'There is a '+ body.currently.precipProbability+ ' % for a rain.')
        }
    })
}


module.exports = forecast