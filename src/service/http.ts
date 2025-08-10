// express-server.ts
import { PublicKey } from '@solana/web3.js'

import express from 'express';
import { fetchPositionInfo } from '../clmm/fetchPositionInfo'
const app = express();
app.get('/', (req, res) => {
  const { name, age } = req.query;
  fetchPositionInfo({ positionNftMint: new PublicKey('D6utSDCbSxpjLDqoTLAaX7KBS4oCNjf6cRGZ4hMVPWk') })

  res.send(`Hello ${name}, age ${age}!`);
});

app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000/');
});