import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBinkartuDto {
    @IsNotEmpty({ message: 'BIN is required' })
    @IsNumber()
    bin_number: number;

    @IsNotEmpty({ message: 'Bank Name is required' })
    bank_name: string;

    @IsNotEmpty({message: "user id must filled!"})
    userId: number

  
}
