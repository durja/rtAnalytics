# Serverless Real-time analytics  

rtAnalytics is a 100% Serverless event-driven real time user analytics service built using AWS services. This service can be used to stream, process millions of requests in real time similar to services like Google Analytics, Mixpanel, etc. 

## Application Flow 

https://user-images.githubusercontent.com/32744604/74901662-82421480-5371-11ea-9847-ee99258dcb1b.png

## AWS Services Used:

### Core Services:

* Cognito - Authentication provider
* API Gateway endpoints
* Lambda
* S3
* Kinesis Streams
* Kinesis Firehose
* Glue Crawler
* Athena

### Operational Services: 
* Cloudwatch
* X-Ray
  
### Resources created using cloud formation templates:

* Dynamo DB Table
* Kinesis Streams
* IAM Roles, Policies for Kinesis Firehose
* Kinesis Firehose
* S3 Bucket

## Installation

```bash

$ aws configure #complete the steps
$ git clone https://github.com/durja/rtAnalytics.git
$ cd rtAnalytics
$ npm install 
$ sls deploy

```