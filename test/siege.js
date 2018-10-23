const siege = require('siege');

siege()
  .concurrent(1000)
  .on(8080)
  .for(10).seconds
  .get('/')
  .attack()