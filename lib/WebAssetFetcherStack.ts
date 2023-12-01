import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import { stages } from "../config/config";
import { Construct } from "constructs";

export interface WebAssetFetcherStackProps extends cdk.StackProps {
  stageName: string;
  webAssetsBucket: s3.Bucket;
}

export class WebAssetFetcherStack extends cdk.Stack {
  public readonly webAssetFetcher: lambda.Function;

  constructor(scope: Construct, id: string, props: WebAssetFetcherStackProps) {
    super(scope, id, props);

    const stageConfig = stages.find(
      (stage) => stage.stageName === props.stageName,
    );

    this.webAssetFetcher = new lambda.Function(this, "WebAssetFetcher", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("./lambda_code/web_asset_fetcher"),
      handler: "index.handler",
      environment: {
        BUCKET_NAME: props.webAssetsBucket.bucketName,
        API_BASE_URL: stageConfig!.apiBaseUrl,
      },
    });

    props.webAssetsBucket.grantRead(this.webAssetFetcher);
  }
}
