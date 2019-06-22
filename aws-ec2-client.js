const AWS = require('aws-sdk');
const util = require('util');

const ec2 = new AWS.EC2({apiVersion: '2016-11-15'})

function addAsyncMethods(obj, methods){
  const a = methods
    .filter((key) => typeof  obj[key] === 'function')
    .forEach(key => {
      obj[key+"Async"] = util.promisify(obj[key])
    })
}

addAsyncMethods(ec2, ["waitFor"])

module.exports = function(){
  return ec2
}


