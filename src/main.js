import $ from 'jquery';

import {CurrencyService} from './currency-service.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function(){
  $("button").click(function(){
    let country = $("#countries option:selected").val();
    let amount = $("#amount").val();
    let currencyService = new CurrencyService();
    currencyService.getExchangeForCountry(country,amount).then((result)=>{
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: country,
      });
      let formattedResult = formatter.format(result);
      $("#results").html(formattedResult);
    }).catch((error)=>{
      $("#results").html(error.message);
    });
  });
});