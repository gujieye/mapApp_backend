const express = require('express');
const router = express.Router();
const client = require('../client')
/* GET home page. */
router.get('/:z/:x/:y.mvt', async function(req, res, next) {
  let z = +req.params.z;
  let x = +req.params.x;
  let y = +req.params.y;
  let tile =await client.getTile(z,x,y,{format:'Mvt'});
  res.send(tile);
});

module.exports = router;
