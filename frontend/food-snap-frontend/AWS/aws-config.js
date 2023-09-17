// aws-config.js
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAV6DW57U3Z4YZI57M',
  secretAccessKey: 'AKtbIruCcO0QIp925VV3B5vuPS6lJfTFH/AvusCH',
  region: 'us-east-1', // e.g., 'us-east-1'
});

export default AWS;