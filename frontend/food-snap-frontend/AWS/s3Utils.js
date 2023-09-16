// s3Utils.js
import {Buffer} from 'buffer'
// import AWS from './aws-config'; // Import the AWS SDK configuration from your aws-config.js file
// Initialize S3
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAV6DW57U3Z4YZI57M',
  secretAccessKey: 'AKtbIruCcO0QIp925VV3B5vuPS6lJfTFH/AvusCH',
  region: 'us-east-1', // e.g., 'us-east-1'
});

const s3 = new AWS.S3();

// Function to upload a photo to S3
export const uploadPhotoToS3 = async (photo) => {
const response = await fetch(photo.name);
const blob = await response.blob();
const key = `photos/${Date.now()}-${photo.name}`;
  const params = {
    Bucket: 'foodsnaps3',
    Key: `photos/${Date.now()}-${photo.name}`,
    Body: blob, // The photo file   
    ContentType: "image/png",
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('Photo uploaded successfully:', data.Location);
    return key; // Return the S3 URL of the uploaded photo
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

export const generatePreSignedUrl = async (objectKey) => {
  console.log("Key: " + objectKey);
  const params = {
    Bucket: 'foodsnaps3',
    Key: objectKey,
    Expires: 3600, // The URL will expire in 1 hour (adjust as needed)
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    return null;
  }
};
