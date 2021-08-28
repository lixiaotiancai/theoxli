export const configuration = () => ({
  port: process.env.NODE_ENV === 'dev' ? 3000 : 80, // 服务端口
});
