export default {
  jwt_customer: {
    secret: process.env.APP_SECRET_CUSTOMER || ('dfadfdsfafadfasd' as string),
    expiresIn: process.env.AAP_EXPIRESIN || ('2d' as string),
  },
  jwt_user: {
    secret: process.env.APP_SECRET_USER || ('tretevterwtvertv' as string),
    expiresIn: process.env.AAP_EXPIRESIN || ('2d' as string),
  },
};
