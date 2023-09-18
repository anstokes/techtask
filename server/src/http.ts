import dotenv from 'dotenv';

import app from './app';

// Read .env configuration
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`HTTP listening on port: ${port}`);
});
