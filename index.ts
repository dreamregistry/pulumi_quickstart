import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";


const config = new pulumi.Config();
const projectId = config.require('dreamProjectId')
const workspace = config.require('dreamWorkspace')
const projectDir = config.require('dreamProjectDir')
const env = JSON.parse(config.require('dreamEnv'))

console.log('projectId:', projectId);
console.log('workspace:', workspace);
console.log('projectDir:', projectDir);
console.log('env:', env);

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html",
    }
});
const bucketObject = new aws.s3.BucketObject("index.html", {
    acl: "public-read",
    contentType: "text/html",
    bucket,
    source: new pulumi.asset.FileAsset("index.html"),
});

// Export the name of the bucket
export const BUCKET_NAME = bucket.id;
export const BUCKET_ENDPOINT = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
