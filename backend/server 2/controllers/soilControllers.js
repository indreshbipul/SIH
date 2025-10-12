
const soilTypes = async(req,res,next)=>{
    const longitude = 84.9926
    const latitute = 25.7947
    const numberOfSoil = 5

    const url = `https://rest.isric.org/soilgrids/v2.0/classification/query?lon=${longitude}&lat=${latitute}&number_classes=${numberOfSoil}`;

    await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
    .then(async (response )=> {
        if (!response.ok) {
            console.error(`ISRIC API Error: ${response.status} - ${response.statusText}`);
            return res.status(500).json("Internal server error")
        }
        response = await response.json();
        const {wrb_class_probability} = response
        return res.status(200).json(wrb_class_probability)
        })
    .catch((err)=> {
        console.error(err)
        res.status(500).json("Internal server error")
    });

}

const soilProperties = async (req,res,next)=>{
    const longitude = 89.9926
    const latitute = 27.7947

    const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitute}&property=bdod&property=cec&property=cfvo&property=clay&property=nitrogen&property=ocd&property=ocs&property=phh2o&property=sand&property=silt&property=soc&property=wv0010&property=wv0033&property=wv1500&depth=0-5cm&depth=0-30cm&depth=5-15cm&depth=15-30cm&value=mean&value=uncertainty`

    try{
        let response = await fetch(url,{
            method : 'GET',
            headers : {
                'accept': 'application/json'
            }
        })
        response = await response.json()
        res.status(200).json(response.properties)
    }
    catch(err){
        res.status(500).json('Internal Server Error')
        console.log(err)
    }
    
}


module.exports = {soilTypes, soilProperties}