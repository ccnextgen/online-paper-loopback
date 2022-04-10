// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, param, post, requestBody} from '@loopback/rest';
import {UserDetails, UserLogin} from '../models';
import {UserRepository} from '../repositories';
import {UserService} from '../services';
require('dotenv').config()


export class UserAuthenticationController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @service(UserService) private userService: UserService
  ) { }

  @post('/api/user/signup')
  async userSignup(
    @requestBody() userDetails: UserDetails
  ) {

    let signupUser = await this.userRepository.userSignup(userDetails)

    let token = await this.userService.genrateToken(
      {
        name: signupUser.name,
        email: signupUser.email,
        userType: signupUser.userType,
        isRefreshToken: false
      }, process.env.TOKEN_EXPIRES_IN
    )

    let refreshToken = await this.userService.genrateToken(
      {
        name: signupUser.name,
        email: signupUser.email,
        userType: signupUser.userType,
        isRefreshToken: false
      }, process.env.REFRESH_EXPIRES_IN
    )

    return {
      name: signupUser.name,
      email: signupUser.email,
      userType: signupUser.userType,
      token: token,
      refreshToken: refreshToken
    }
  }

  @get('/api/user/tokenGenerate')
  async tokenGenerate(
    @param.query.string('refreshToken') refreshToken: string
  ) {

    let refrshTokenDetails = await this.userService.validateRefreshToken(refreshToken)
    if (refrshTokenDetails.success) {
      let token = await this.userService.genrateToken(
        {
          name: refrshTokenDetails.name,
          email: refrshTokenDetails.email,
          userType: refrshTokenDetails.userType,
          isRefreshToken: false
        }, process.env.TOKEN_EXPIRES_IN
      )
      return {
        token: token
      }
    } else {
      return {...refrshTokenDetails, token: null}
    }
  }


  @post('/api/user/login')
  async userLogin(
    @requestBody() userLogin: UserLogin
  ) {
    let loginUser = await this.userRepository.userLogin(userLogin)

    if (!loginUser.success) {
      return {
        success: false,
        error: loginUser.error
      }
    }
    if (loginUser.name && loginUser.email && loginUser.userType) {
      let token = await this.userService.genrateToken(
        {
          name: loginUser.name,
          email: loginUser.email,
          userType: loginUser.userType,
          isRefreshToken: false
        }, process.env.TOKEN_EXPIRES_IN
      )

      let refreshToken = await this.userService.genrateToken(
        {
          name: loginUser.name,
          email: loginUser.email,
          userType: loginUser.userType,
          isRefreshToken: false
        }, process.env.REFRESH_EXPIRES_IN
      )

      return {
        name: loginUser.name,
        email: loginUser.email,
        userType: loginUser.userType,
        token: token,
        refreshToken: refreshToken
      }

    } else {
      return {
        success: false,
        error: loginUser.error
      }
    }

  }


  @get('api/user/isAuthenticated')
  async isAuthenticated(
    @param.query.string('token') token: string
  ) {
    let isAuthenticated = await this.userService.validateToken(token);
    console.log(isAuthenticated)
    return isAuthenticated.success
  }
}


