"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
class CdkStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const myBuck = new aws_cdk_lib_1.aws_s3.Bucket(this, "CdkBucket", {
            publicReadAccess: true,
            websiteIndexDocument: "index.html"
        });
        new aws_cdk_lib_1.aws_s3_deployment.BucketDeployment(this, "CdkDeployBucket", {
            sources: [aws_cdk_lib_1.aws_s3_deployment.Source.asset(".../dist")],
            destinationBucket: myBuck
        });
        const distribution = new aws_cdk_lib_1.aws_cloudfront.Distribution(this, 'CfDistribution', {
            defaultBehavior: { origin: new aws_cdk_lib_1.aws_cloudfront_origins.S3Origin(myBuck) },
        });
    }
}
exports.CdkStack = CdkStack;
//# sourceMappingURL=cdk-stack.js.map