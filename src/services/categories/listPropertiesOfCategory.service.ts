import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/app.error';

const listAllPropertiesCategoryService = async ( categoryId: string ) => {
    if( categoryId.length !== 36 ) {
        throw new AppError( 'Category not exists!', 404 );
    };

    const categoryRepository = AppDataSource.getRepository(Category);

    const findCategory = categoryRepository.findOneBy({ id: categoryId })
    if( !findCategory ) {
        throw new AppError( 'Category not exists!', 404 );
    }

    const properties = await categoryRepository.createQueryBuilder('categories')
        .innerJoinAndSelect('categories.properties', 'properties')
        .innerJoinAndSelect('properties.category', 'category')
        .where('categories.id = :categoryId', { categoryId: categoryId })
        .select([ 'categories.id as categoryId', 'properties', 'category' ])
        .getRawMany();

    return properties;
};

export { listAllPropertiesCategoryService };