import { IsString, IsEmail } from 'class-validator';

export class SinginUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
