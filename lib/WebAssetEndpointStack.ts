import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export interface WebAssetEndpointStackProps extends cdk.StackProps {
  stageName: string;
  webAssetFetcher: lambda.Function;
}

export class WebAssetEndpointStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: WebAssetEndpointStackProps) {
    super(scope, id, props);

    const webAssetEndpoint = new apigateway.RestApi(this, "WebAssetEndpoint", {
      restApiName: "WebAssetEndpoint",
      description: "Manages web asset retrieval from S3 via Lambda.",
    });

    const webAssetEndpointDeployment = new apigateway.Deployment(
      this,
      "WebAssetEndpointDeployment",
      {
        api: webAssetEndpoint,
      },
    );

    webAssetEndpoint.deploymentStage = new apigateway.Stage(
      this,
      `WebAssetEndpoint${props.stageName}`,
      {
        deployment: webAssetEndpointDeployment,
        stageName: props.stageName,
      },
    );

    const webAssetFetcherIntegration = new apigateway.LambdaIntegration(
      props.webAssetFetcher,
    );

    webAssetEndpoint.root.addProxy({
      defaultIntegration: webAssetFetcherIntegration,
    });
  }
}
