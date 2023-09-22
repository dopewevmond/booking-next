import * as mongoose from "mongoose";
/**
 * @typedef {import('mongoose').Mongoose} Mongoose
 */

/**
 * @type {{ client: Mongoose }}
 */
global.mongo = global.mongo || {};

/**
 * @returns {Promise<Mongoose>}
 */
export const connectToDB = async () => {
  try {
    if (!global.mongo.client) {
      global.mongo.client = mongoose;
      await global.mongo.client.connect(process.env.MONGO_URI);
    }
    return global.mongo.client;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
