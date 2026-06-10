import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), "/.env"),
});

interface EnvConfig {
  PORT: string;
  BASE_URL: string;
  USERNAME: string;
  PASSWORD: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

const loadEnvVariable = (): EnvConfig => {
  const requiredVariable: string[] = [
    "PORT",
    "BASE_URL",
    "PASSWORD",
    "USERNAME",
    "CLIENT_ID",
    "CLIENT_SECRET",
  ];
  requiredVariable.forEach((item) => {
    if (!process.env?.[item]) {
      throw Error(
        `Environment variable ${item} is required but not set in .env file.`,
      );
    }
  });
  return {
    PORT: process.env.PORT as string,
    BASE_URL: process.env.BASE_URL as string,
    CLIENT_ID: process.env.CLIENT_ID as string,
    CLIENT_SECRET: process.env.CLIENT_SECRET as string,
    USERNAME: process.env.USERNAME as string,
    PASSWORD: process.env.PASSWORD as string,
  };
};

export const env = loadEnvVariable();
