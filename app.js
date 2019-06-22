const ec2 = require('./aws-ec2-client')();

(async () => {
  const EC2_INSTANCE_ID = process.env["EC2_INSTANCE_ID"]
  console.log(process.env.EC2_INSTANCE_ID)

  try {
    const instance = await ec2.waitForAsync('instanceRunning',{
      'instance-id': EC2_INSTANCE_ID
    })

    // const res = await ec2.waitForAsync('volumeAvailable', {
    //   "status": "available",
    //   "tag":{
    //     "tag:Naner":""
    //   }
    // });
    // const res = {}
    console.log(instance)
    process.exit(0)

  } catch(err) {
    console.log(err)
    process.exit(1)
  }
})()
