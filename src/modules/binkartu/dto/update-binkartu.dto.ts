import { PartialType } from '@nestjs/mapped-types';
import { CreateBinkartuDto } from './create-binkartu.dto';

export class UpdateBinkartuDto extends PartialType(CreateBinkartuDto) {}
