import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserSchema } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserSchema>) {}
  async getUsers(): Promise<User> {
    const users = await this.userModel.findOne({}).exec();
    console.log(users);
    return users;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({_id: id}).exec();
    return user;
  }
  async createUser(data: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(data);
    const user = await newUser.save();
    return user;
  }

  async findOne(): Promise<User> {
    const user = await this.userModel.findOne({ name: 'tienn' }).exec();
    return user;
  }
}
