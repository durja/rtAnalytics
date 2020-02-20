# Serverless Real-time analytics  

rtAnalytics is a 100% Serverless event-driven real time user analytics service built using AWS services. 

### Usecases: 

rtAnalytics showcases how AWS services can be used to stream, process millions of requests in real time similar to services like Google Analytics, Mixpanel, etc. 

This project can be extended for the following use cases at an enterprise level. 

* Application user analytics within enterprise
* Process real-time data powering enterprise dashboards
* Fraud analysis based on the user metrics in conjunction with Machine learning services on AWS
* Any other use cases, where there is large amounts of data that needs to be processed in real time. 

## Application Flow 

https://user-images.githubusercontent.com/32744604/74901662-82421480-5371-11ea-9847-ee99258dcb1b.png

## AWS Services Used:

### Core Services:

* Cognito - Authentication provider
* API Gateway endpoints
  * /engage - POST and AWS_IAM Authorizer
  * /track - POST and AWS_IAM Authorizer

* Lambda
  * track - posts site analytics to Analytics kinesis stream 
  * engage- posts user profile to User Profile kinesis stream 
  * saveUserProfile- auto triggered based on kinesis events and events are stored to dynamo db. 
  
* Kinesis Streams
  * User Profile Stream
  * Analytics Stream
* Kinesis Firehose
  * Delivers events from analytics kinesis stream to S3 Bucket
* Glue Crawler
  * Creates relational table schema from analytics events in S3 bucket
* Athena
  * Query on analytics events in S3 bucket. 
  * Athena queries can be used in conjunction with Quicksight for dashboards, reporting. 

### Operational Services: 
* Cloudwatch
* X-Ray

### Developer Services: 
* Code pipeline
* Code build
  
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