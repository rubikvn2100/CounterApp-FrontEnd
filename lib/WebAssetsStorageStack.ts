import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { webAssetsStorageConfig } from "../config/config";
import { Construct } from "constructs";

export interface WebAssetsStorageStackProps extends cdk.StackProps {
  stageName: string;
}

export class WebAssetsStorageStack extends cdk.Stack {
  public readonly webAssetsBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: WebAssetsStorageStackProps) {
    super(scope, id, props);

    const bucketName = `web-assets-bucket-${props.stageName.toLowerCase()}`;

    this.webAssetsBucket = new s3.Bucket(this, "WebAssetsBucket", {
      bucketName: bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: webAssetsStorageConfig.enforceSSL,
      versioned: webAssetsStorageConfig.versioned,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new s3deploy.BucketDeployment(this, "DeployWebAssets", {
      sources: [s3deploy.Source.asset("web_assets")],
      destinationBucket: this.webAssetsBucket,
    });
  }
}
