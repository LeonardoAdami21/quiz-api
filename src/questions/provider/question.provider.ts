import { PrismaClient } from '@prisma/client';
import { IProvider } from '../../interface/IProvider';
import { DATA_SOURCE } from '../../config/data.source';

export const QUESTION__REPOSITORY = 'QUESTION__REPOSITORY';

export const questionsProvider: IProvider<PrismaClient['question']>[] = [
  {
    provide: QUESTION__REPOSITORY,
    useFactory: (prisma: PrismaClient) => prisma.question,
    inject: [DATA_SOURCE],
  },
];
