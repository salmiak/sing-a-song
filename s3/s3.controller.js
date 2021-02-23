const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize');
const aws = require('aws-sdk');
const uuid = require('uuid').v4;

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || require('config').S3_BUCKET_NAME;

aws.config.region = 'eu-north-1';

router.get('/', authorize(), getSignedURL);

function getSignedURL(req, res) {
  const s3 = new aws.S3();
  const fileName = uuid();
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
}

module.exports = router;
