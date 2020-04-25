const request=require('request');

const weatherCode=(latitude,longitude,callback)=>{

const url="http://api.weatherstack.com/current?access_key=5e258e1b9f54066a629b0c06306417d9&query="+latitude+","+longitude+"&units=s";


request({url,json:true},(error,{body})=>{
  
    if (error)
    {
       callback("The weather service is now down!",undefined);
    }
    else if(body.error)
    {

        callback("Unable to find the location",undefined);
    
    }
    else{
        callback(undefined,
        body.current.weather_descriptions[0]+", the current temperatue is "+body.current.temperature+" but Feelslike "+body.current.feelslike
        )
    }
}); 
}
module.exports=weatherCode