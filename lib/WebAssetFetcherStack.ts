import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export interface WebAssetFetcherStackProps extends cdk.StackProps {
  webAssetsBucket: s3.Bucket;
}

export class WebAssetFetcherStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebAssetFetcherStackProps) {
    super(scope, id, props);

    const webAssetFetcherRole = new iam.Role(this, "WebAssetFetcherRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole",
        ),
      ],
    });

    props.webAssetsBucket.grantRead(webAssetFetcherRole);

    new lambda.Function(this, "WebAssetFetcher", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("./lambda_code/web_asset_fetcher"),
      handler: "index.handler",
      role: webAssetFetcherRole,
      environment: {
        stageName: id,
        account: props.env?.account || "unset-account",
        region: props.env?.region || "unset-region",
        BUCKET_NAME: props.webAssetsBucket.bucketName,
      },
    });
  }
}
