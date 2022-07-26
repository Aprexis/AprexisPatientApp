import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      api: {
        environment: process.env.APREXIS_API || '',
        development: {
          android: 'http://10.0.2.2:3250',
          other: 'http://localhost:3250'
        },
        staging: 'https://staging.aprexis.com/api',
        production: 'https://portal.aprexis.com/api'
      }
    }
  };
};
