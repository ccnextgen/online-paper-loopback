import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {tokenUser} from '../models';
var jwt = require('jsonwebtoken');
require('dotenv').config()

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(/* Add @inject to inject parameters */) { }

  async genrateToken(userDetails: tokenUser, expiresIn?: string) {
    return jwt.sign(userDetails, process.env.SECRET, {expiresIn: expiresIn});
  }


  async validateRefreshToken(refreshToken: string) {
    try {
      var decoded = jwt.verify(refreshToken, process.env.SECRET);
      decoded.success = true
      return decoded

    } catch (err) {
      return {
        success: false,
        error: err
      }
    }
  }

  async validateToken(token: string) {
    try {
      var decoded = jwt.verify(token, process.env.SECRET);
      decoded.success = true
      return decoded

    } catch (err) {
      return {
        success: false,
        error: err
      }
    }
  }

}
