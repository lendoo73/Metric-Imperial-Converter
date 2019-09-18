/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const unitObj = {
    gal: ["L", "liters", 3.78541],
    lbs: ["kg", "kilograms", 0.453592],
    mi: ["km", "kilometers", 1.60934],
    l: ["gal", "gallons", 0.26417],
    kg: ["lbs", "pounds", 2.20462],
    km : ["mi", "miles", 0.62137]
  };
  
  this.getNum = function(input) {
    let result;
    // delete unit-part from the end:
    const numberPart = input.replace(/[a-z]+$/i, "");
    // check if the format is supported (fractal or decimal):
    const regEx = /^(\d*)(\d+(\.\d+)?)?(\/\d+(\.\d+)?)?$/;
    if (!(regEx.test(numberPart))) return;
    // split the input at '/':
    const splitedNumbers = numberPart.split("/");
    splitedNumbers.length === 2 
      ? result = splitedNumbers[0] / splitedNumbers[1]
      : splitedNumbers[0].length === 0
        ? result = 1
        : result = splitedNumbers[0] / 1
    ;
    return result;
  };
  
  this.getUnit = function(input) {
    let unitPart = input.split(/[0-9]/);
    unitPart = unitPart[unitPart.length - 1].toLowerCase();
    if (unitObj.hasOwnProperty(unitPart)) return unitPart;
  };
  
  this.getReturnUnit = function(initUnit) {
    return unitObj[initUnit][0];
  };

  this.spellOutUnit = function(unit) {
    var result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    return Math.round(unitObj[initUnit][2] * initNum * 1e5 ) / 1e5;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    console.log(returnUnit);
    return `${initNum} ${unitObj[returnUnit.toLowerCase()][1]} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
