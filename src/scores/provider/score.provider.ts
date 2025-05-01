import { PrismaClient } from '@prisma/client';
import { IProvider } from '../../interface/IProvider';
import { DATA_SOURCE } from '../../config/data.source';

export const SCORE__REPOSITORY = 'SCORE__REPOSITORY';

export const scoresProvider: IProvider<PrismaClient['score']>[] = [
  {
    provide: SCORE__REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.score,
    inject: [DATA_SOURCE],
  },
];
