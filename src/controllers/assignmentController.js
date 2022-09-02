let axios = require("axios")
// 2.  GOTO  http://api.openweathermap.org => “subscribe” current weather data ==> get api key for Free version ==> create new account and Verify your emailId( Must verify to avoid issues) => go to My APi keys under your account name(top right corner) or https://home.openweathermap.org/api_keys => save the key/appid somewhere. Now proceed further
// Create API's to do each of the following:
                    // - get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
                    // - then change the above to get the temperature only( of London)
                    // - Sort the cities  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature
                    // result should look something like this
                    // [
                    // {city:"London", temp: 280},
                    // {city:"Moscow", temp: 290},
                    // {city:"Bangalore", temp: 301.2},
                    // .......
                    // ]

let getLondonTemprature = async function(req, res){
    try {
    let city = req.query.q
    let appid = req.query.appid
    let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
    }
    let result = await axios(options)
    res.status(200).send({msg: result.data})
   } 
   catch(error){
      console.log(error)
      res.status(500).send({msg: error.message})
   }
}

let getSortedCities = async function(req, res) {
    try {
        let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = []
        for(let i=0;i<cities.length;i++){
    
            let obj = {city: cities[i]} //{city: "Bengaluru"}
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=d562fec6f30f6afa7bd9ab38b003a21f`)
            console.log(resp.data.main.temp) 
            obj.temp = resp.data.main.temp    ///{city: "Bengaluru", temp :temp: 301.2}
            console.log(obj.temp)
            cityObjArray.push(obj)
            console.log(cityObjArray)
          
    }
    let sorted = cityObjArray.sort( function(a, b) {return a.temp - b.temp}) 
    console.log(sorted)  //asending 
    res.status(200).send({data: sorted})
}catch(err){
    console.log(err)
    res.status(500).send({msg: "server error"})
}
}

module.exports.getSortedCities = getSortedCities
module.exports.getLondonTemprature = getLondonTemprature