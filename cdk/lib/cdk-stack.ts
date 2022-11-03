import { Construct } from 'constructs';
import { Stack, StackProps, aws_s3 as s3, aws_s3_deployment as s3Deployment, aws_cloudfront as cloudFront, aws_cloudfront_origins as origins } from 'aws-cdk-lib';

export class CdkStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // s3
    const myBuck = new s3.Bucket(this, "CdkBucket", {
      publicReadAccess: true,
      websiteIndexDocument: "index.html"
    });

    // Deployment
    new s3Deployment.BucketDeployment(this, "CdkDeployBucket", {
      sources: [s3Deployment.Source.asset("../dist")],
      destinationBucket: myBuck
    });

    //CF = CDN of AWS
    // Handles buckets whether or not they are configured for website hosting.
    const distribution = new cloudFront.Distribution(this, 'CfDistribution', {
      defaultBehavior: { origin: new origins.S3Origin(myBuck) },
    });

  }
}
