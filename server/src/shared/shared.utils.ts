import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: 'ap-northeast-2'
});

export const uploadToS3 = async (file, userId, folderName="uploads/") => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'insta-clone-again',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();

  return Location;
};
