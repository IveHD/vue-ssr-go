const siege = require('siege');

siege()
  .concurrent(1000)
  .on(3000)
  .for(10).seconds
  .get('/')
  .attack()