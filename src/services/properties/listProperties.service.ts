import AppDataSource from '../../data-source';
import { Property } from '../../entities/properties.entity';
import { IPropertyResponse } from '../../interfaces/properties';
import { listPropertiesSerializer } from '../../serializers/property.serializer';

const listPropertiesService = async (): Promise<IPropertyResponse[] | undefined> => {
    const propertyRepository = AppDataSource.getRepository(Property);

    const properties = await propertyRepository.find();

    const listProperties = await listPropertiesSerializer.validate(properties, { stripUnknown: true });

    return listProperties;
};

export { listPropertiesService };