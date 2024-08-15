require('dotenv').config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message TEXT,
  timestamp DATE DEFAULT CURRENT_DATE
);

INSERT INTO messages (username, message)
VALUES
  ('Bryan', 'Hi there!'),
  ('Odin', 'Hello world!'),
  ('Anderson', 'Lorem ipsum');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
