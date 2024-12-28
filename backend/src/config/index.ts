import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    apiUrl:
      process.env.API_URL || `http://localhost:${process.env.PORT || 5000}`,
  },
  db: {
    uri: process.env.MONGODB_URI || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "calories_app_secret_2024",
    expire: process.env.JWT_EXPIRE || "24h",
  },
  security: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
  },
};
