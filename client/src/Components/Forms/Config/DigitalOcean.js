import AWS from 'aws-sdk';

/**
 * Digital Ocean Spaces Connection
 */

const spacesEndpoint = new AWS.Endpoint('sfo2.digitaloceanspaces.com');
const S3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: "earlybirds",
      secretAccessKey: "XT3NLU4ILM5NLXMA2242"
    });
export default S3;
