import * as cdk from "aws-cdk-lib";
import { WebAssetsStorageStack } from "./WebAssetsStorageStack";
import { WebAssetFetcherStack } from "./WebAssetFetcherStack";
import { WebAssetEndpointStack } from "./WebAssetEndpointStack";
import { AlarmNotificationStack } from "./AlarmNotificationStack";
import { Construct } from "constructs";

export class AppStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props: cdk.StackProps) {
    super(scope, stageName, props);

    const webAssetsStorageStack = new WebAssetsStorageStack(
      this,
      "WebAssetsStorageStack",
      {
        stageName: stageName,
      },
    );

    const webAssetFetcherStack = new WebAssetFetcherStack(
      this,
      "WebAssetFetcherStack",
      {
        stageName: stageName,
        webAssetsBucket: webAssetsStorageStack.webAssetsBucket,
      },
    );

    new WebAssetEndpointStack(this, "WebAssetEndpointStack", {
      stageName: stageName,
      webAssetFetcher: webAssetFetcherStack.webAssetFetcher,
    });

    new AlarmNotificationStack(this, "AlarmNotificationStack", {
      stageName: stageName,
    });
  }
}
