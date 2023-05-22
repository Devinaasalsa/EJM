import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBinkartuDto } from './dto/create-binkartu.dto';
import { UpdateBinkartuDto } from './dto/update-binkartu.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BinKartu, Prisma } from '@prisma/client';

@Injectable()
export class BinkartuService {
  constructor(private prisma: PrismaService) { }

  async createBIN(data: Prisma.BinKartuCreateInput): Promise<BinKartu> {
    await this.prisma.binKartu.findUnique({
        where:{
            bin_number: data.bin_number
        }
    }).then(bin_number => {
        if(bin_number !== null){
            throw new BadRequestException([`BIN Kartu ${data.bin_number} has already exists`]);
        }
    });

    const result = await this.prisma.binKartu.create({
        data:{
            ...data,
            user:{
                connect: {
                    id_user: +data.userId
                }
            }
        },
    });
    
    return result;
}


  /**
  *Get All BIN Card Record With Deleted_at IsNull
  */

  async findAllBIN() {
    return await this.prisma.binKartu.findMany({
      where: {
        deleted_at: null
      }
    })
  }


  /**
  * Find Code by id and check is the record has deleted or not/
  * @param userId 
  * @returns {User}
  */

  async getBINById(id_BIN: number): Promise<BinKartu> {
    const findBINById = await this.prisma.binKartu.findUnique({
      where: { id_BIN },
    });

    if (findBINById === null) {
      throw new NotFoundException([`Id ${id_BIN} not found!`])
    }

    if (!findBINById || findBINById.deleted_at) {
      const message = findBINById
        ? [`Code of id ${id_BIN} is not found`]
        : [`Code of id ${id_BIN} is already deleted`]

      throw new BadRequestException([message]);
    }
    return findBINById;
  }

  /**
  * Update Bin Kartu Code
  */

  async updateBIN(
    id_BIN: number,
    data: Prisma.BinKartuUpdateInput,
  ): Promise<BinKartu> {
    const findBINById = await this.prisma.binKartu.findUnique({
      where: {
        id_BIN: +id_BIN,
      },
    });

    if (findBINById === null) {
      throw new NotFoundException([`Id ${id_BIN} not found!`])
    }

    const isDeletedNotNull = await this.prisma.binKartu.findUnique(
      {
        where: {
          id_BIN: +id_BIN,
        },
        select: {
          deleted_at: true,
        }
      }
    )

    if (isDeletedNotNull && isDeletedNotNull.deleted_at !== null) {
      throw new BadRequestException(`[${+id_BIN}] This record is has been deleted`)
    }

    return await this.prisma.binKartu.update({
      where: {
        id_BIN: +id_BIN,
      },
      data: { ...data },
    });
  }

  /**
  *Update BIN Kartu by changing column deleted_at null to datetime
  *and check if data with id is not available, then throw error not found
  */

  async deleteBIN(id_BIN: number): Promise<BinKartu> {
    const findBINById = await this.prisma.binKartu.findUnique({
      where: {
        id_BIN: +id_BIN,
      },
    });

    if (findBINById === null) {
      throw new NotFoundException([`Id ${id_BIN} not found!`])
    }

    const isDeletedNotNull = await this.prisma.binKartu.findUnique(
      {
        where: {
          id_BIN: +id_BIN,
        },
        select: {
          deleted_at: true,
        }
      }
    );

    if (isDeletedNotNull && isDeletedNotNull.deleted_at !== null) {
      throw new BadRequestException(`[${+id_BIN}] This record is has been deleted`)
    }

    return this.prisma.binKartu.update({
      where: {
        id_BIN: +id_BIN,
      },
      data: {
        deleted_at: new Date(),
        updated_at: new Date()
      }
    })
  }


}
