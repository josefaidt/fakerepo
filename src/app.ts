import 'source-map-support/register.js'
import { fileURLToPath } from 'node:url'
import * as cdk from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import { GitHubActions } from './github-actions'
import { pkg } from './pkg'

const app = new cdk.App({
  context: {
    name: 'fakerepo',
    env: 'main',
    version: pkg.version,
  },
})

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    cdk.Tags.of(this).add('app:name', this.node.tryGetContext('name'))

    new GitHubActions(this, 'GitHubActions', {
      repo: 'josefaidt/fakerepo',
    })

    const fn = new lambda.NodejsFunction(this, 'MyFunction', {
      entry: fileURLToPath(new URL('./handler.ts', import.meta.url)),
      functionName: 'my-function',
      bundling: {
        minify: true, // minify code, defaults to false
        sourceMap: true, // include source map, defaults to false
        sourceMapMode: lambda.SourceMapMode.INLINE, // defaults to SourceMapMode.DEFAULT
        target: 'esnext',
        define: {
          'import.meta.vitest': 'undefined',
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        tsconfig: fileURLToPath(new URL('../tsconfig.json', import.meta.url)),
        format: lambda.OutputFormat.ESM,
      },
      runtime: Runtime.NODEJS_16_X,
    })

    cdk.Tags.of(fn).add('app:env', this.node.tryGetContext('env'))
    cdk.Tags.of(fn).add('app:version', this.node.tryGetContext('version'))
  }
}

new Stack(app, 'Stack', {
  stackName: `fakerepo-main`,
})
