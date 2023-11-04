import * as cdk from "aws-cdk-lib";
import { WebAssetsStorageStack } from "./WebAssetsStorageStack";
import { Construct } from "constructs";

export class AppStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props: cdk.StackProps) {
    super(scope, stageName, props);

    new WebAssetsStorageStack(this, "WebAssetsStorageStack", {
      env: props.env,
      stageName: stageName,
    });
  }
}
