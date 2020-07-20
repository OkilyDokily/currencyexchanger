export class CurrencyService{
 
  async prePopulated(){
    if (sessionStorage.getItem("countries")){
      var obj = JSON.parse(sessionStorage.countries);
      return obj;
    } 

    try{
      var exchangeRates = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
    }
    
    catch(err)
    { //provide a somewhat more helpful fetch error than "failed to fetch"
      throw Error("You made a request to a site that does not exist or is down. Or your OWN network is down.");
    }
    let jsonified = await exchangeRates.json();
    sessionStorage.setItem('countries', JSON.stringify(jsonified["conversion_rates"]));
    
    return jsonified["conversion_rates"];
  }

  async getExchangeForCountry(exchange, initial, amount){
    try{
      var exchangeRates = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${initial}`);
    }
    catch(err)
    { //provide a somewhat more helpful fetch error than "failed to fetch"
      throw Error("You made a request to a site that does not exist or is down. Or your OWN network is down.");
    }
    
    if(exchangeRates.status === 200){
      let jsonified = await exchangeRates.json();

      if(jsonified["error-type"] === "invalid-key"){
        throw Error("You aren't using a valid API key.")
      }

      if(jsonified["error-type"] === "base-code-only-on-pro"){
        throw Error("You can only find exchange rates for the USA and the Euro at your access level.")
      }

      if(jsonified["unsupported-code"] === "invalid-key"){
        throw Error("You aren't using a supported country code.")
      }

      if(jsonified.result === "error"){//this error comes from the exchangerate-api site
        throw Error ("There was something wrong with your query: " + jsonified["error-type"]);
      }
      let conversionRate = jsonified["conversion_rates"][exchange];
      return conversionRate * amount; 
      let usd =  amount / result[initial];
      let conversion = usd * result[exchange]; 
    }
    else{
      throw Error("HTTP Error code: " + exchangeRates.status);
    }
  
  }
}