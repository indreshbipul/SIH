const location = "kharagpur";

const realTime = async(req,res,next)=>{
    const options = {method: 'GET',
    headers: {accept: 'application/json'}};

    await fetch( `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${process.env.WEATHER_API_KEY}`, options)
    .then(response => response.json())
    .then(response => {
        res.status(200).json({response})
    })
    .catch(err => {
        console.error(err)
        res.status(500).json("Internal server error")
    });
}

const forcast = async(req,res,next)=>{
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${process.env.WEATHER_API_KEY}&timesteps=1d`;
    const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'accept-encoding': 'deflate, gzip, br'}
    };

    await fetch(url, options)
    .then(async(response) => {
        response = await response.json()
        res.status(200).json({response})
    })
     .catch(err => {
        console.error(err)
        res.status(500).json("Internal server error")
    });    
}

const timeLine = async(req,res,next)=>{
    const url = `https://api.tomorrow.io/v4/timelines?apikey=${process.env.WEATHER_API_KEY}`;
    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip, br',
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        location: location,
        fields: ['temperature'],
        units: 'metric',
        timesteps: ['1h'],
        startTime: 'now',
        endTime: 'nowPlus7h',
        dailyStartHour: 6
    })
    };

    await fetch(url, options)
    .then(async(response) => {
        response =  await response.json()
        res.status(200).json({response})
    })
     .catch(err => {
        console.error(err)
        res.status(500).json("Internal server error")
    });
}

module.exports = {realTime,forcast,timeLine}