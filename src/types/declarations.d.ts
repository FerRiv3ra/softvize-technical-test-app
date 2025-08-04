declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";
declare module "*.webp";

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    EXPO_PUBLIC_API_URL: string;
    EXPO_PUBLIC_API_VERSION?: string;
  }
}
