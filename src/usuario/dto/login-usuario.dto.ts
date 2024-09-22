import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUsuariodto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
