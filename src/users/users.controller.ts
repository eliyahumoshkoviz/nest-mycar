import { Body, Controller, Post, Get, Param, Query, Delete, Patch, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serializer } from 'src/Interceptors/serializer.Interceptor';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('auth')
@Serializer(UserDto)
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) { }

 

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null
  }

  @Get('/single/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) throw new NotFoundException('User not found');
    return user
  }
  // @Get('/findUserByCookie')
  // async findUserByCookie(@Session() session: any) {
  //   const user = await this.usersService.findOne(session.userId)
  //   if (!user) throw new NotFoundException('User not found');
  //   return user
  // }

  @Get('/findUserByCookie')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }


  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body)
  }

}
