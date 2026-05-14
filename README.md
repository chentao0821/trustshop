# TrustShop — 一个带评论可信度与供应商良心评级的购物平台原型

简介
---
TrustShop 是一个购物平台原型，目标解决现实电商中的“刷评/恶意差评”问题，并为上游供应链（品牌商/供应商/工厂/研发）提供“良心/内卷”评级，帮助消费者识别良心商家。

主要特色
- 评论可信度评分：基于交易次数与评论数计算每条评论/商品的可信度分数，帮助过滤刷评行为。
- 供应链评级：展示上游厂商的研发投入、工资、管理层收入与年龄友好度，并给出“内卷/良心”评分，供消费者选择。
- 多平台客户端：Flutter 客户端支持 Android/iOS/Windows（可扩展接入华为 HMS）。

技术栈（建议）
- 后端：Node.js + TypeScript + Express + PostgreSQL（当前示例使用内存存储）
- 客户端：Flutter（支持 Android / iOS / Windows）
- CI：GitHub Actions（Node.js 测试 / lint）

快速开始（后端）
1. 安装依赖
   cd backend
   npm install
2. 运行开发服务器
   npm run dev
3. 示例 API
   - POST /transactions  创建交易记录
   - POST /reviews       创建评论记录
   - GET /products/:id/trustscore  获取商品可信度分数
   - GET /suppliers/:id/rating     获取供应商“良心”评级

后续工作建议
- 用 PostgreSQL 持久化数据、添加用户认证（JWT/OAuth）、接入真实交易数据源。
- 为 Flutter 客户端做完整 UI/导航，并接入 HMS（华为服务）。
- 设计更加复杂的信誉评分模型（考虑评论作者历史、IP、设备指纹、时间序列异常检测）。
- 增加审核队列、人工复核和机器学习异常检测。

许可证
- MIT（文件已在仓库中）

贡献
- 请参考 CONTRIBUTING.md 与 CODE_OF_CONDUCT.md
