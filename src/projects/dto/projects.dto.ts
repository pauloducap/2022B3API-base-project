import { IsString,IsNotEmpty, IsUUID, MinLength } from "class-validator";

export class CreateProjectDto {

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name!: string;

  
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  referringEmployeeId!: string;
}


