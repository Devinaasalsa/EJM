import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BinkartuService } from './binkartu.service';
import { CreateBinkartuDto } from './dto/create-binkartu.dto';
import { UpdateBinkartuDto } from './dto/update-binkartu.dto';
import { BinKartu, User } from '@prisma/client';

@Controller('binkartu')
export class BinkartuController {
  constructor(private readonly binkartuService: BinkartuService) {}

  @Post('create')
  create(
    @Body() createBinkartuDto: CreateBinkartuDto,
    ): Promise<BinKartu> {
    return this.binkartuService.createBIN(createBinkartuDto);
  }

  @Get('get-all')
  findAll() {
    return this.binkartuService.findAllBIN();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.binkartuService.getBINById(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBinkartuDto: UpdateBinkartuDto) {
    return this.binkartuService.updateBIN(+id, updateBinkartuDto);
  }

  @Put('delete/:id')
  remove(@Param('id') id: string) {
    return this.binkartuService.deleteBIN(+id);
  }
}
