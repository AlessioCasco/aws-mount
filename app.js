const ec2 = require('./aws-ec2-client')();

(async () => {
  try {
    const res = await ec2.waitForAsync('volumeAvailable', {});
    // const res = {}
    console.log(res)
    process.exit(0)

  } catch(err) {
    console.log(err)
    process.exit(1)
  }
})()
