import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CdkpipelinesDemoStage } from './cdkpipelines-demo-stage';
import { ShellScriptAction } from '@aws-cdk/pipelines';
import {StringParameter} from "@aws-cdk/aws-ssm";

/**
 * The stack that defines the application pipeline
 */
export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();
    const oauthToken = SecretValue.secretsManager('/cdkpipelines-demo-pipeline-stack/github/token', {jsonField: 'github-token'});
    // const EnvironmentAccount = SecretValue.secretsManager('/plt/environment/account', {jsonField: 'EnvironmentAccount'});
    // const RepoBranch = SecretValue.secretsManager('/plt/github/branch', {jsonField: 'RepoBranch'});
    // const EnvironmentAccount = StringParameter.valueFromLookup(this, "/plt/environment/account");
    // const RepoBranch = StringParameter.valueFromLookup(this, "/plt/github/branch");

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyServicePipeline',
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: oauthToken,
        owner: 'mrvindu',
        repo: 'cdkpipelines-demo',
        branch: 'master',
      }),

       // How it will be built and synthesized
       synthAction: SimpleSynthAction.standardNpmSynth({
         sourceArtifact,
         cloudAssemblyArtifact,

         // We need a build step to compile the TypeScript Lambda
         buildCommand: 'npm run build'
       }),
    });

      const preprod = new CdkpipelinesDemoStage(this, 'PreProd', {
        env: { account: '810799446236', region: 'eu-west-1' }
      });
      const preprodStage = pipeline.addApplicationStage(preprod);
      preprodStage.addActions(new ShellScriptAction({
        actionName: 'TestService',
        useOutputs: {
          // Get the stack Output from the Stage and make it available in
          // the shell script as $ENDPOINT_URL.
          ENDPOINT_URL: pipeline.stackOutput(preprod.urlOutput),
        },
        commands: [
          // Use 'curl' to GET the given URL and fail if it returns an error
          'curl -Ssf $ENDPOINT_URL',
        ],
      }));

  }
}
