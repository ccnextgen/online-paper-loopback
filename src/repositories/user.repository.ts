import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import bcrypt from 'bcrypt';
import {MongodbDataSource} from '../datasources';
import {User, UserDetails, UserLogin, UserRelations} from '../models';
var jwt = require('jsonwebtoken');

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,

  ) {
    super(User, dataSource);
  }


  async userSignup(userDetails: UserDetails) {
    const saltRounds = 10;
    const unHashedPassword = userDetails.password
    const hashedPassword = bcrypt.hashSync(unHashedPassword, saltRounds);

    let signupUser = await this.create({
      name: userDetails.name,
      email: userDetails.email,
      userType: userDetails.userType,
      password: hashedPassword
    })

    return signupUser
  }

  async userLogin(userLogin: UserLogin) {

    const unHashedPassword = userLogin.password
    const user = await this.findOne({
      where: {email: userLogin.email}
    })

    if (!user) return {
      success: false,
      error: "user is not in system"
    }

    const isAuthenticated = bcrypt.compareSync(unHashedPassword, user.password)

    if (!isAuthenticated) return {
      success: false,
      error: "password is invalid"
    }



    return {
      name: user.name,
      email: user.email,
      userType: user.userType,
      success: true
    }
  }
}
