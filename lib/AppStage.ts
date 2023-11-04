import * as cdk from "aws-cdk-lib";
import { WebAssetsStorageStack } from "./WebAssetsStorageStack";
import { WebAssetFetcherStack } from "./WebAssetFetcherStack";
import { Construct } from "constructs";

export class AppStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props: cdk.StackProps) {
    super(scope, stageName, props);

    const webAssetsStorageStack = new WebAssetsStorageStack(
      this,
      "WebAssetsStorageStack",
      {
        env: props.env,
        stageName: stageName,
      },
    );

    new WebAssetFetcherStack(this, "WebAssetFetcherStack", {
      env: props.env,
      webAssetsBucket: webAssetsStorageStack.webAssetsBucket,
    });
  }
}
