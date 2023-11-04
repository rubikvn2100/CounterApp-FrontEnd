# CounterApp FrontEnd Pipeline

This project focuses on deploying a Continuous Deployment Pipeline using AWS CDK with TypeScript. The pipeline is designed to monitor changes in multiple repositories, including:

* Deployment Infrastructure
* Web Assets
* Lambda Code
* Configuration

Upon detecting changes, the pipeline triggers a build process and deploys updates across various application stages:

* **Dev** for Development
* **PreProd** for Pre-Production
* **Prod** for Production

The architecture of the Count App, deployed by this pipeline, is straightforward yet efficient. It includes an API Gateway that triggers a Lambda function to retrieve assets stored in S3 bucket.

## Features

* **Automated Pipeline:** Monitors changes in various repositories and automates the deployment process.
* **Multi-Stage Deployment:** Supports multiple environments like Dev, PreProd, and Prod.
* **Simplified Architecture:** Utilizes API Gateway and Lambda functions to serve content from S3.

## Useful commands

* `npm run build` compile typescript to js.
* `npm run clean` remove compiled .js and .d.ts files from ./bin, ./lib, and ./test directories.
* `npm run clean:all` removes compiled files, deletes node_modules, and reinstalls dependencies.
* `npm run deploy` perform test, build, and synth scripts.
* `npm run format` automatically format code to maintain consistent style.
* `npm run test` perform the jest unit tests.
* `npm run watch` watch for changes and compile.
* `cdk deploy` deploy this stack to your default AWS account/region.
* `cdk diff` compare deployed stack with current state.
* `cdk synth` emits the synthesized CloudFormation template.
