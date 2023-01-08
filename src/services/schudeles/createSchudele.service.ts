import AppDataSource from '../../data-source';
import { Property } from '../../entities/properties.entity';
import { Schudele } from '../../entities/schudeles.entity';
import { User } from '../../entities/users.entity';
import { AppError } from '../../errors/app.error';
import { IScheduleRequest } from '../../interfaces/schedules';

const createSchudeleService = async ( schudeleData: IScheduleRequest ): Promise<object> => {
    const newHour = Number((schudeleData.hour).split(':')[0])
    if( newHour < 8 || newHour >= 18 ) {
        throw new AppError( 'It is only possible from 08:00 to 18:00!', 400 );
    };

    const dayOfWeek = new Date(schudeleData.date).getDay();
    if( dayOfWeek === 0 || dayOfWeek === 6 ) {
        throw new AppError( 'It is only possible on weekdays.', 400 );
    };

    const propertyRepository = AppDataSource.getRepository(Property);
    const schudeleRepository = AppDataSource.getRepository(Schudele);
    const userRepository = AppDataSource.getRepository(User);
    
    const findHour = await propertyRepository.createQueryBuilder('properties')
        .leftJoinAndSelect('properties.schudeles', 'schudeles')
        .where('properties.id = :id', { id: schudeleData.propertyId })
        .andWhere('schudeles.date = :date', { date: schudeleData.date})
        .andWhere('schudeles.hour = :hour', { hour: schudeleData.hour})
        .getOne();
    
    if( findHour ) {
        throw new AppError( 'Horário ou data não disponível', 400 );
    };

    const findProperty = await propertyRepository.findOneBy({ id: schudeleData.propertyId });
    if( !findProperty ) {
        throw new AppError( 'Propriedade não existente', 400 );
    };

    const findeUser = await userRepository.findOneBy({ id: schudeleData.userId });
    
    const createdSchudele = schudeleRepository.create({ 
        date: schudeleData.date,
        hour: schudeleData.hour,
        property: findProperty,
        user: findeUser!
     });

    await schudeleRepository.save(createdSchudele);

    return {message: 'schedule created with sucess'};
};

export { createSchudeleService };