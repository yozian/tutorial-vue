import axios from 'axios';

const instance = axios.create({
  baseURL: undefined,
  timeout: 1000 * 60 * 3, // 3 mins as the same as server
  maxContentLength: 1024 * 50,
  // accept all status codes
  validateStatus: () => true,
  responseType: "json",
});

const ClientActionTimeHeaderName = "x-client-action-time";

instance.interceptors.request.use((config) => {


  config.headers[ClientActionTimeHeaderName] = new Date().getTime().toString();

  console.log(config);

  return config;
})


instance.interceptors.response.use((res) => {
  const config = res.config;
  const headers = config.headers
  const actionTime = Number(headers[ClientActionTimeHeaderName] || 0);

  const timeElapsed = new Date().getTime() - actionTime;

  console.info(`axios- time elapsed: ${timeElapsed} ms for ${config.url}`, {
    url: config.url,
    reqHeaders: config.headers,
    requestBody: config.data,
    status: res.status,
    resHeaders: res.headers,
    resBody: res.data,
  });

  return res;
});

export const MyAxios = instance;




