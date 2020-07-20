import $ from 'jquery';

import {CurrencyService} from './currency-service.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


$(document).ready(function(){
  (async () => {
    let currencyService = new CurrencyService();
    let result = await currencyService.prePopulated();
    let countries = Object.keys(result);
    let text = "";
    countries.forEach(countryCode =>{
      text+= `<option value="${countryCode}">${countryCode}</option>`;
    });
    $("#initial2").html(text);
    $("#exchange2").html(text);    
    
  
    $("#button2").click(function(){
      let exchange = $("#exchange2 option:selected").val();
      let initial = $("#initial2 option:selected").val();
      let amount = $("#amount2").val();

      let conversion = currencyService.returnExchangeRate(amount, result[initial],result[exchange]);
     
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: exchange,
      });
      let formattedResult = formatter.format(conversion);
      $("#results2").html(formattedResult);
    });

    $("#button").click(function(){
      let exchange = $("#exchange option:selected").val();
      let initial = $("#initial option:selected").val();
      
      let amount = $("#amount").val();
      let conversion = currencyService.returnExchangeRate(amount, result[initial],result[exchange]);
        
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: exchange,
      });
  
      let formattedResult = formatter.format(conversion);
      $("#results").html(formattedResult);
    
    });
  })();
});


