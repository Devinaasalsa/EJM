import { Module } from '@nestjs/common';
import { BinkartuService } from './binkartu.service';
import { BinkartuController } from './binkartu.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [BinkartuController],
  providers: [BinkartuService, PrismaService],
  exports: [BinkartuService],
})
export class BinkartuModule {}
