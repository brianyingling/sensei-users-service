import AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});

const put = (params) => new Promise((resolve, reject) => {
  docClient.put(params, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const query = (params) => new Promise((resolve, reject) => {
  console.log('making the query...');
  console.log('AWS ACCESS KEY ID in query:', process.env.AWS_ACCESS_KEY_ID);
  console.log('AWS SECRET ACCESS KEY in query:', process.env.AWS_SECRET_ACCESS_KEY);
  docClient.query(params, (err, data) => {
    console.log('data:', data);
    if (err) {
      console.log('error:', err);
      reject(err);
    }
    else resolve(data);
  });
});

export {
  put,
  query,
};
