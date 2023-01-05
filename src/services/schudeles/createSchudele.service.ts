import AppDataSource from '../../data-source';
import { Schudele } from '../../entities/schudeles.entity';
import { AppError } from '../../errors/app.error';
import { IScheduleRequest, IScheduleResponse } from '../../interfaces/schedules';
import { responseSchudeleSerializer } from '../../serializers/schudele.serializer';

const createSchudeleService = async ( schudeleData: IScheduleRequest ): Promise<IScheduleResponse> => {
    if( schudeleData.hour < '08:00' || schudeleData.hour > '18:00' ) {
        throw new AppError( 'It is only possible from 08:00 to 18:00!', 400 );
    };

    const dayOfWeek = new Date(schudeleData.date).getDay();
    if( dayOfWeek === 0 || dayOfWeek === 6 ) {
        throw new AppError( 'It is only possible on weekdays.', 400 );
    };

    const schudeleRepository = AppDataSource.getRepository(Schudele);

    const findSchudele = await schudeleRepository.createQueryBuilder('schudeles')
        .innerJoinAndSelect('schudeles.property', 'property')
        .innerJoinAndSelect('schudeles.user', 'user')
    .getRawMany();

    console.log(findSchudele);

    const createdSchudele = schudeleRepository.create(schudeleData);
    await schudeleRepository.save(createdSchudele);

    const schudeleResponse = await responseSchudeleSerializer.validate(createdSchudele, { stripUnknown: true });

    return schudeleResponse;
};

export { createSchudeleService };