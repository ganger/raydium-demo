import { PublicKey } from '@solana/web3.js';
import express from 'express';
import { fetchPositionInfo } from '../clmm/fetchPositionInfo';

const app = express();

app.get('/', async (req, res) => {  // 注意这里添加了 async
  const { name, age } = req.query;

  try {
    // 使用 await 等待异步操作完成
    await fetchPositionInfo({
      positionNftMint: new PublicKey('D6utSDCbSxpjLDqoTLAaX7KBS4oCNjf6cRGZ4hMVPWk')
    });
    console.log("ok")
    res.send(`Hello ${name}, age ${age}!`);
  } catch (error) {
    console.error('Error:', error);  // 打印错误日志
    res.status(500).send('Internal Server Error');  // 返回 500 错误
  }
});

app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000/');
});

