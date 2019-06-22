const ec2 = require('./aws-ec2-client')();

(async () => {
  const EC2_INSTANCE_ID = process.env["EC2_INSTANCE_ID"]
  console.log(process.env.EC2_INSTANCE_ID)

  try {
    const instance = await ec2.waitForAsync('instanceRunning',{
      'Filters':[
        {
          'Name': 'instance-id',
          'Values': [EC2_INSTANCE_ID]
        }
      ]
    })


    // const res = {}
    const name = instance['Reservations'][0]['Instances'][0]['Tags'].find(el => el.Key === 'Name').Value
    console.log(`istance name: ${name}`)

    const volume = await ec2.waitForAsync('volumeAvailable', {
      'Filters':[
        {
          'Name': 'tag:Name',
          'Values': [name]
        }
      ]
    });
    // const volume_name = volume['Reservations'][0]['Instances'][0]['Tags'].find(el => el.Key === 'Name').Value
    const volume_name = volume["Volumes"][0]["Tags"].find((el) => el.Key ==="Name" ).Value
    const volume_id = volume["Volumes"][0]["VolumeId"]
    console.log(`valume name/id: ${volume_name} / ${volume_id}`)

    const device = "/dev/sdz"

    const attach = await ec2.waitForAsync('volumeAvailable', {
      Device: device,
      InstanceId: EC2_INSTANCE_ID,
      VolumeId: volume_id
    })

    console.log(`SUCCESS: EC2_INSTANCE_ID successfully attacched in ${device}`)

    process.exit(0)

  } catch(err) {
    console.log(err)
    process.exit(1)
  }
})()
