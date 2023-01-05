import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { AppError } from '../../errors/app.error';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/categories';
import { responseCategorySerializer } from '../../serializers/category.serializer';

const createCategoryService = async ( categoryData: ICategoryRequest ): Promise<ICategoryResponse> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const findCategory = await categoryRepository.findOneBy({ name: categoryData.name });
    if( findCategory ) {
        throw new AppError( 'Category already exists!', 400 );
    };

    const createdCategory = categoryRepository.create(categoryData);
    await categoryRepository.save(createdCategory);

    const categoryResponse = await responseCategorySerializer.validate( createdCategory, { stripUnknown: true } );
    
    return categoryResponse;
};

export { createCategoryService };