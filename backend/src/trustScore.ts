import { db } from './models';

/**
 * 简单可信度评分公式（0-100，值越高越可信）
 *
 * 思路（示例）：
 * - 如果某商品交易量大但评论少（transactions >> reviews），则每条评论可信度高（有价值）。
 * - 如果评论远多于交易（可能刷评或机器生成），则可信度低。
 *
 * 公式（示例，容易理解且稳定）：
 * score = 100 * (1 - reviewsCount / (transactionsCount + reviewsCount))
 *
 * 示例：
 * transactions=10, reviews=1 -> score ≈ 100 * (1 - 1/11) = 90.9
 * transactions=10, reviews=100 -> score ≈ 100 * (1 - 100/110) = 9.09
 *
 * 这个只是基础版本，后续可引入更多因子（评论者历史、设备、时间序列异常、重复评论检测等）。
 */
export function computeProductTrustScore(productId: string) {
  const transactions = db.transactions.filter(t => t.productId === productId).length;
  const reviews = db.reviews.filter(r => r.productId === productId).length;

  const transactionsCount = Math.max(0, transactions);
  const reviewsCount = Math.max(0, reviews);

  if (transactionsCount + reviewsCount === 0) {
    return 50; // 无数据：中性分
  }

  const score = 100 * (1 - reviewsCount / (transactionsCount + reviewsCount));
  return Math.round(Math.max(0, Math.min(100, score)));
}
