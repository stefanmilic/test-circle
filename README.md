# bug-bounty

This AWS Lambda Function automatically submits findings from an automated scanner (detectify) to our Bug Bounty Program. Both, the automated scanner and the bug bounty program have a restful API. The function should be triggered by webhook and then fetch the findings from the automated scanner and submit the via API to the bug bounty program.

<img src='static/image.jpg' />

### Local Setup

Prerequistes:

- make sure you have `node` and `npm` installed.
- install `serverless` framework globally: `npm i -g serverless`
- if you have not configured aws credentials, add fake one like this: `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`. It is needed for serverless framework to work properly.
- we use `serverless-secrets-plugin` for encrypting and decrypting environment variables to avoid steal sensitive data.
- keep in mind every time when you add new variable you need encrypt your file.
- encrypt : `sls encrypt --stage stage_prefix (ex. prod or dev) --password 'your_password'`
- decrypt : `sls decrypt --stage stage_prefix (ex. prod or dev) --password 'your_password'`

Instal project dependencies by running `npm install`.

Start app by running `npm start`.

### Deployment

Deplyment is done through CI/CD pipeline on Circleci.

- Deploy to develop environment:
  Whenever `develop` branch is updated, build-deploy process will start for `dev` stage.

- Deploy to production environment:
  Similiary, when `master` baranch is updated, build-deploy process starts for `prod` stage, with one additional step of manual deployment approval.

### Tests

To run unit tests `npm test`.
