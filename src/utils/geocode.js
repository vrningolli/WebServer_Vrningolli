const request=require('request');

const geoCode=(address,callBack)=>{

const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoidnJuaW5nb2xsaSIsImEiOiJjazkxNXljdncwN3l4M3Fud2FnZXowZ211In0.41zKz4jz1_0V6c7b69j48Q"

request({url,json:true},(error,{body})=>{
    if(error)
    {
       callBack('The service is now unavailable!',undefined); 
    }
    else if(body.message)
    {    
       callBack('Unable to find the Message!!',undefined);
    }
   else if(body.features.length===0)
    {   
        callBack('Type the proper query!!',undefined);
    }
   else
    {
        callBack(undefined,{latitude : body.features[0].center[1],
        longitude: body.features[0].center[0],
        location:body.features[0].place_name})
    }  
})
}

module.exports=geoCode;