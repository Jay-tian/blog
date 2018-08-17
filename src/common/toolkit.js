const xxtea = require('./xxtea.js');
const fs = require('fs');

exports.arrayIndex = function(data, column){
  let newData = [];
  if (!data) {
    return [];
  }
  data.forEach(f => {
    newData.push(f[column]);
  });

  return newData;
};

exports.getYMD = function() {
  return new Date().toLocaleDateString();
};

exports.timestamp = function(){
  return Math.round(new Date() / 1000);
};

exports.isMobileClient = function(agent){
  return agent.match(/(iPhone|iPod|Android|ios)/i);
};

exports.requires = function(data, keys){
  let result = true;
  keys.every(function(key) {
    if (!data.hasOwnProperty(key)) {
      result = false;
      return false;
    }

    return true;
  }, this);

  return result;
};

exports.unique = function(data) {
  return Array.from(new Set(data));
};

exports.checkDirExist = function(p){
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
};

exports.getSizeOfObject = function(object) {
  var objectList = [];
  var stack = [ object ];
  var bytes = 0;

  while ( stack.length ) {
    let value = stack.pop();
    if ( typeof value === 'boolean' ) {
      bytes += 4;
    } else if ( typeof value === 'string' ) {
      bytes += value.length * 2;
    } else if ( typeof value === 'number' ) {
      bytes += 8;
    } else if (typeof value === 'object'
      && objectList.indexOf( value ) === -1) {
      objectList.push( value );
      for( var i in value ) {
        stack.push( value[ i ] );
      }
    }
  }

  return bytes;
};

