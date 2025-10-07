const realTimeWeather = async(req,res,next)=>{
    ;
    const location = "MUMBAI";

    const options = {method: 'GET',
    headers: {accept: 'application/json'}};

    await fetch( `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${process.env.API_KEY}`, options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        res.status(200).json({response})
    })
    .catch(err => console.error(err));
}

module.exports = {realTimeWeather}