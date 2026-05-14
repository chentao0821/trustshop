import express from 'express';
import bodyParser from 'body-parser';
import { db } from './models';
import { computeProductTrustScore } from './trustScore';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());

// 创建交易
app.post('/transactions', (req, res) => {
  const tx = {
    id: uuidv4(),
    productId: req.body.productId,
    userId: req.body.userId,
    timestamp: Date.now()
  };
  db.transactions.push(tx);
  res.status(201).json(tx);
});

// 创建评论
app.post('/reviews', (req, res) => {
  const r = {
    id: uuidv4(),
    productId: req.body.productId,
    userId: req.body.userId,
    rating: req.body.rating || 5,
    comment: req.body.comment || '',
    timestamp: Date.now()
  };
  db.reviews.push(r);
  res.status(201).json(r);
});

// 获取商品可信度分数
app.get('/products/:id/trustscore', (req, res) => {
  const productId = req.params.id;
  const score = computeProductTrustScore(productId);
  res.json({ productId, trustScore: score });
});

// 供应商 profile（示例：简单评分）
app.post('/suppliers', (req, res) => {
  const s = {
    id: uuidv4(),
    name: req.body.name,
    rAndDInvestmentUSD: req.body.rAndDInvestmentUSD,
    avgWorkerSalaryUSD: req.body.avgWorkerSalaryUSD,
    execAverageAge: req.body.execAverageAge,
    execAverageIncomeUSD: req.body.execAverageIncomeUSD
  };
  db.suppliers.push(s);
  res.status(201).json(s);
});

app.get('/suppliers/:id/rating', (req, res) => {
  const id = req.params.id;
  const s = db.suppliers.find(x => x.id === id);
  if (!s) return res.status(404).json({ error: 'not found' });

  // 简单示例评分：工资与研发投入越高越好，管理层年龄越合理越好（只是示例）
  let score = 50;
  if (s.avgWorkerSalaryUSD) score += Math.min(25, (s.avgWorkerSalaryUSD / 1000));
  if (s.rAndDInvestmentUSD) score += Math.min(25, Math.log10(s.rAndDInvestmentUSD + 1));
  // 调整并约束
  score = Math.round(Math.max(0, Math.min(100, score)));
  res.json({ supplierId: id, rating: score, profile: s });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`TrustShop backend listening on ${port}`);
});
