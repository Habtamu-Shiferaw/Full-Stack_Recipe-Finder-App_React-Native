import "dotenv/config" //without this package process.env.PORT will be undefined.

export const ENV = {
    PORT: process.env.PORT || 5001, // the reserve is incase you want a callback port value.
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV, 
}