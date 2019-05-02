interface IEnvironmentVar extends NodeJS.ProcessEnv {
  MONGODB_URI: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  CSRF_TOKEN: string;
  JWT_SALT: string;
}

const config: IEnvironmentVar = process.env as IEnvironmentVar;

export default config;
