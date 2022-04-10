import {Entity, model, property} from '@loopback/repository';

@model()
export class Vehicle extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  contactName: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleType: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleCondition: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleMake: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleModel: string;

  @property({
    type: 'string',
    required: true,
  })
  manufacturedYear: string;

  @property({
    type: 'string',
    required: true,
  })
  price: string;

  @property({
    type: 'string',
    required: true,
  })
  transmissionType: string;

  @property({
    type: 'string',
    required: true,
  })
  fuelType: string;

  @property({
    type: 'string',
    required: true,
  })
  engineCapacity: string;

  @property({
    type: 'string',
    required: true,
  })
  mileage: string;

  @property({
    type: 'object',
  })
  options?: object;

  @property({
    type: 'string',
  })
  additionalInfo?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  imageUrls?: string[];


  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;

export interface VehicleDetails {
  contactName: string;
  phoneNumber: string;
  city: string;
  vehicleType: string;
  vehicleCondition: string;
  vehicleMake: string;
  vehicleModel: string;
  manufacturedYear: string;
  price: string;
  transmissionType: string;
  fuelType: string;
  engineCapacity: string;
  mileage: string;
  options?: string[];
  additionalInfo?: string;
  imageUrls?: string[];
}
