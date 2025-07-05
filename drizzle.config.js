import { ENV } from "./src/config/env.js"; //put the extension

export default {
    schema: "./src/db/schema.js",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {url: ENV.DATABASE_URL},
};