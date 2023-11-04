import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export interface WebAssetsStorageStackProps extends cdk.StackProps {
  stageName: string;
}

export class WebAssetsStorageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebAssetsStorageStackProps) {
    super(scope, id, props);

    const bucketName = `web-assets-bucket-${props.stageName.toLowerCase()}`;

    new s3.Bucket(this, "WebAssetsBucket", {
      bucketName: bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
