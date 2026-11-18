import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile =
    process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development";

dotenv.config({
    path: path.resolve(__dirname, "../../", envFile)
});

export const config = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    clientId:process.env.CLIENT_ID ,      // audience when verifyIdToken from Google Cloud.
    redisUrl:process.env.REDIS_URL,
    serverFE:process.env.SERVER_FE
};
