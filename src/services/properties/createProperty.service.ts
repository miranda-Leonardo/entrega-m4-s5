import AppDataSource from '../../data-source';
import { Address } from '../../entities/addresses.entity';
import { Property } from '../../entities/properties.entity';
import { AppError } from '../../errors/app.error';
import { IPropertyRequest, IPropertyResponse } from '../../interfaces/properties';
import { responsePropertySerializer } from '../../serializers/property.serializer';

const createPropertyService = async ( { value, size, categoryId, address: addressData }: IPropertyRequest ): Promise<IPropertyResponse> => {
    const addressRepository = AppDataSource.getRepository(Address);

    const findAddress = await addressRepository.findOneBy({ district: addressData.district });
    if( findAddress ) {
        throw new AppError( 'Property already exists!', 400 );
    };

    const createdAddress = addressRepository.create(addressData);
    await addressRepository.save(createdAddress);
    
    const propertyData = { value, size, categoryId };
    const propertyRepository = AppDataSource.getRepository(Property);

    const createdProperty = propertyRepository.create(propertyData);
    await propertyRepository.save(createdProperty);

    const propertyResponse = await responsePropertySerializer.validate({ ...createdProperty, adress: createdAddress }, {
        stripUnknown: true
    });

    return propertyResponse;
};

export { createPropertyService };