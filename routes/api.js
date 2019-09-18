/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();
  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      // var input = "4.88kmf";
      var initNum = convertHandler.getNum(input);
      let error = "";
      if (!(initNum)) error = "invalid number";
      var initUnit = convertHandler.getUnit(input);
      console.log(initUnit);
      if(!(initUnit)) {
        error ? error += " and unit" : error = "invalid unit";
      }
    console.log("req", req);
      if (error) return res.send(error);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });
};
