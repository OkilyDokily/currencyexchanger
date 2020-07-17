export class CurrencyService{
 
  async getExchangeForCountry(exchange, initial, amount){
    try{
      var exchangeRates = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${initial}`);
    }
    catch(err)
    { //provide a somewhat more helpful fetch error than "failed to fetch"
      console.dir(err);
      throw Error("You made a request to a site that does not exist or is down. Or your OWN network is down.");
    }
    
    if(exchangeRates.status === 200){
      let jsonified = await exchangeRates.json();

      if(jsonified["error-type"] === "invalid-key"){
        throw Error("You aren't using a valid API key.")
      }

      if(jsonified.result === "error"){//this error comes from the exchangerate-api site
        throw Error ("There was something wrong with you query. Either the specified country is unavailable at the currency exchanger site, or you are making a query that is ill-formed/not compatible with this applications access level.");
      }
      let conversionRate = jsonified["conversion_rates"][exchange];
      return conversionRate * amount; 
    }
    else{
      throw Error("Error code: " + exchangeRates.status);
    }
  
  }
}