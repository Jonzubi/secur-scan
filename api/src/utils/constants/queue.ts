import { CronExpression } from '@nestjs/schedule';

export const FREE_QUEUE_INTERVAL: CronExpression =
  CronExpression.EVERY_30_SECONDS;

export const PAID_QUEUE_INTERVAL: CronExpression =
  CronExpression.EVERY_5_SECONDS;
