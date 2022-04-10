// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {get, post, requestBody} from '@loopback/rest';
import {VehicleDetails} from '../models';
import {VehicleRepository} from '../repositories/vehicle.repository';

// import {inject} from '@loopback/core';


export class VehicleController {
  constructor(
    @repository(VehicleRepository) public vehicleRepository: VehicleRepository
  ) { }

  @post('/api/vehicle/add')
  async addVehicle(
    @requestBody() vehicleDetails: VehicleDetails
  ) {
    vehicleDetails.imageUrls = []
    return await this.vehicleRepository.addVehicle(vehicleDetails)
  }


  @get('/api/vehicle/getList')
  async getList(
  ) {

    return await this.vehicleRepository.find({})
  }
}
