import $ from 'jquery';

import {CurrencyService} from './currency-service.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


$(document).ready(function(){
  (async () => {
    let currencyService = new CurrencyService();
    try {
      let result = await currencyService.prePopulated();
      let countries = Object.keys(result);
      let text = "";
      countries.forEach(countryCode =>{ //we prepopulate the menus with data from the api.
        text+= `<option value="${countryCode}">${countryCode}</option>`;
      });
      $("#initial2").html(text);
      $("#exchange2").html(text);  
    
    
      $("#button2").click(function(){
        let exchange = $("#exchange2 option:selected").val();
        let initial = $("#initial2 option:selected").val();
        let amount = $("#amount2").val();

        try{
          let conversion = currencyService.returnExchangeRate(amount, result[initial],result[exchange]);
          
          var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: exchange,
          });
          let formattedResult = formatter.format(conversion);
          $("#results2").html(formattedResult);
        }
        catch(err){
          $("#results2").html(err);
        }
      });

      $("#button").click(function(){
        let exchange = $("#exchange option:selected").val();
        let initial = $("#initial option:selected").val();
        let amount = $("#amount").val();
        
        try{
          let conversion = currencyService.returnExchangeRate(amount, result[initial],result[exchange]);
      
          var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: exchange,
          });
      
          let formattedResult = formatter.format(conversion);
          $("#results").html(formattedResult);
        }
        catch(err){
          $("#results").html(err);
        }
       
      });
    }
    catch(err){
      $("#error #message").html(err);
      $("#error #instruction").html("Reload the page or even close and reopen a tab after you have fixed any errors in the code.");    
    }
  })();
});


