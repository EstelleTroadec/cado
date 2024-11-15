import 'dotenv/config';

import { Client } from 'pg';

const client = new Client(process.env.PG_URL);

client.connect();

module.exports = client;