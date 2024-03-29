const AWS = require('aws-sdk');
const util = require('util');
const EC2_REGION = process.env.EC2_REGION

const ec2 = new AWS.EC2({apiVersion: '2016-11-15', region: EC2_REGION})

function addAsyncMethods(obj, methods){
  methods
    .forEach(key => {
      obj[key+"Async"] = util.promisify(obj[key])
    })
}

addAsyncMethods(ec2, ["waitFor","attachVolume"])

module.exports = function(){
  return ec2
}


