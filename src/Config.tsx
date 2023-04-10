const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://playground.tesonet.lt/v1'
    : 'https://playground.tesonet.lt/v1';

export default baseURL;
