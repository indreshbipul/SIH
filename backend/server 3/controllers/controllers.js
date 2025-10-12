import aiModel from "../utils/ai.js";

// Fetch soil types data
const soilTypes = async () => {
  const url1 = `${process.env.API_SERVER_URL}/api/soilType`;
  try {
    const response = await fetch(url1, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch soil types");
    return await response.json();
  } catch (error) {
    console.error(error);
    return "No soil Data Found";
  }
};

// Fetch soil properties data
const soilProp = async () => {
  const url2 = `${process.env.API_SERVER_URL}/api/soilProp`;
  try {
    const response = await fetch(url2, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch soil properties");
    return await response.json();
  } 
  catch (error) {
    console.error(error);
    return "No soil Data Found";
  }
};

const weatherForcast = async(req,res,next)=>{
    const url3 = `${process.env.API_SERVER_URL}/api/forcast`
    try{
        const response = await fetch(url3,{
            method: "GET",
            headers: { accept: "application/json" },
        })
        if (!response.ok) throw new Error("Failed to fetch soil properties");
        return await response.json();
    } 
    catch (error) {
        console.error(error);
        return "No Weather Data Found";
    }
}

const summarizeSoilProperties = (layers) => {
  if (!Array.isArray(layers) || layers.length === 0) {
    return "No soil property data found.";
  }

  return layers
    .map((layer) => {
      const name = layer.name || "Unknown Property";
      const unit = layer.unit_measure?.target_units || "";

      const depthSummaries = layer.depths
        .map((depth) => {
          const label =
            depth.label ||
            `${depth.range.top_depth}-${depth.range.bottom_depth}${depth.range.unit_depth}`;
          const meanValue = depth.values?.mean ?? "N/A";
          return `${label}: ${meanValue}${unit ? " " + unit : ""}`;
        })
        .join("; ");

      return `${name.toUpperCase()} (${unit}): ${depthSummaries}`;
    })
    .join("\n");
};

const summarizeWeatherForecast = (forecastArray) => {
  if (!Array.isArray(forecastArray)) return "No weather forecast data found.";

  return forecastArray.map((entry) => {
    const date = new Date(entry.time).toDateString();
    const temp = `Temp: ${entry.values.temperatureAvg}°C (min: ${entry.values.temperatureMin}, max: ${entry.values.temperatureMax})`;
    const humidity = `Humidity: ${entry.values.humidityAvg}%`;
    const uv = `UV Index: ${entry.values.uvIndexAvg}`;
    const wind = `Wind: ${entry.values.windSpeedAvg} m/s`;

    return `${date} → ${temp}, ${humidity}, ${uv}, ${wind}`;
  }).join("\n");
};


const soilHealth = async (req, res, next) => {
  try {
    let { prompt } = req.params;
    prompt = prompt;

    const soilTypeData = await soilTypes();
    const soilPropData = await soilProp();
    const weatherForcastData = await weatherForcast()
    const soilPropSummary = summarizeSoilProperties(soilPropData.layers);
    const summarizedWeather = summarizeWeatherForecast(weatherForcastData);
    const aiResponse = await aiModel(prompt, soilTypeData, soilPropSummary, summarizedWeather);


    res.status(200).json(aiResponse);
  } catch (err) {
    next(err);
  }
};

export default { soilHealth };
