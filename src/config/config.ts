require('dotenv/config');

export const config = {
    MONGO_DB: process.env.MONGO_DB,
    PORT: process.env.PORT || 3000,
};
