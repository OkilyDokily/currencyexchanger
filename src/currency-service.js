export class CurrencyService{
 
  async prePopulated(){
    if (sessionStorage.getItem("countries")){
      var obj = JSON.parse(sessionStorage.countries);
      return obj;
    } 

    try{
      var exchangeRates = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
    }
    catch(err){ //provide a somewhat more helpful fetch error than "failed to fetch"
      throw Error("You made a request to an api server that does not exist or is down. Or your OWN network is down.");
    }

    let jsonified = await exchangeRates.json();
    this.detectErrors(jsonified,exchangeRates.status);
    sessionStorage.setItem('countries', JSON.stringify(jsonified["conversion_rates"]));
    
    return jsonified["conversion_rates"];
  }

  returnExchangeRate(amount, initial, exchange ){
    if(amount && initial && exchange){
      let usd =  amount / initial;
      return usd * exchange;
    }
    else{  
      if (!amount){
        throw Error("You need an amount");
      }
      else if (!initial){
        throw Error("Your initial value code does not exist in this api.");
      }
      else if  (!exchange){
        throw Error("Your exchange value code does not exist in this api.");
      }
    }
  }
    

  detectErrors(jsonified, status){
    if(status === 200){
     
      if(jsonified["error-type"] === "invalid-key"){
        throw Error("You aren't using a valid API key.");
      }

      if(jsonified["error-type"] === "base-code-only-on-pro"){
        throw Error("You can only find exchange rates for the USA and the Euro at your access level.")
      }

      if(jsonified["unsupported-code"] === "invalid-key"){
        throw Error("You aren't using a supported country code.");
      }

      if(jsonified.result === "error"){//this error comes from the exchangerate-api site
        throw Error ("There was something wrong with your query: " + jsonified["error-type"]);
      }
      
    }
    else{
      throw Error("HTTP Error code: " + status);
    }
  }
}