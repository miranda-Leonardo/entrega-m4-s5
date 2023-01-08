import AppDataSource from '../../data-source';
import { Address } from '../../entities/addresses.entity';
import { Category } from '../../entities/categories.entity';
import { Property } from '../../entities/properties.entity';
import { AppError } from '../../errors/app.error';
import { IPropertyRequest, IPropertyWithAddressResponse } from '../../interfaces/properties';
// import { responsePropertyWithAddressSerializer } from '../../serializers/property.serializer';

const createPropertyService = async ( { value, size, categoryId, address: addressData }: IPropertyRequest ): Promise<IPropertyWithAddressResponse> => {
    const propertyData = { value, size };
    
    const categooryRepository = AppDataSource.getRepository(Category);
    
    const findCategory = await categooryRepository.findOneBy({ id: categoryId });    
    if( !findCategory ) {
        throw new AppError( 'Category does not exist!', 404 );
    };
    
    const addressRepository = AppDataSource.getRepository(Address);    
    const findAddress = await addressRepository.findOneBy({ district: addressData.district });
    
    if( findAddress ) {
        throw new AppError( 'Property already exists!', 409 );
    };

    const createdAddress = addressRepository.create(addressData);
    await addressRepository.save(createdAddress);
    
    const propertyRepository = AppDataSource.getRepository(Property);

    const createdProperty = propertyRepository.create({...propertyData, category: findCategory, address: createdAddress});
    await propertyRepository.save(createdProperty);
    
    // const propertyResponse = await responsePropertyWithAddressSerializer.validate({ ...createdProperty, categoryId, adress: createdAddress }, {
    //     stripUnknown: true
    // });

    return createdProperty;
};

export { createPropertyService };