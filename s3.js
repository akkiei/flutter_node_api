const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

class PullConfig {
    // this functionality is not currently working as I dont have access to s3 account in aws.
    // but these function can be used to download file from s3
	constructor(bucketName = 'bucket name', fileName = 'file name') {
		AWS.config.update({
			accessKeyId: 'need access key',
			secretAccessKey: 'need secret here',
			region: 'ap-south-1'
		});
		this.s3 = new AWS.S3();
		this.s3Params = {
			Bucket: bucketName,
			Key: fileName
		};
	}

	downloadCSVFromS3(fileName = '') {
		const downloadedFileName = fileName.length > 0 ? fileName : this.s3Params.Key;
		try {
			const readStream = this.s3.getObject(this.s3Params).createReadStream();
			const writeStream = fs.createWriteStream(path.join(__dirname, '..', downloadedFileName));
			readStream.pipe(writeStream);
		} catch (error) {
			return error;
		}
	}
}

module.exports = PullConfig;
