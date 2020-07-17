import $ from 'jquery';

import {CurrencyService} from './currency-service.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function(){
  $("button").click(function(){
    let exchange = $("#exchange option:selected").val();
    let initial = $("#initial option:selected").val();
    console.log(initial)
    let amount = $("#amount").val();
    let currencyService = new CurrencyService();
    currencyService.getExchangeForCountry(exchange,initial, amount).then((result)=>{
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: exchange,
      });
      let formattedResult = formatter.format(result);
      $("#results").html(formattedResult);
    }).catch((error)=>{
      $("#results").html(error.message);
    });
  });
});