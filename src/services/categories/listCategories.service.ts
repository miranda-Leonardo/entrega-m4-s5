import AppDataSource from '../../data-source';
import { Category } from '../../entities/categories.entity';
import { ICategoryResponse } from '../../interfaces/categories';
import { listCategoriesSerializer } from '../../serializers/category.serializer';

const listCategoriesService = async (): Promise<ICategoryResponse[] | undefined> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = await categoryRepository.find();

    const listCategories = await listCategoriesSerializer.validate( categories, {
        stripUnknown: true
    });

    return listCategories;
};

export { listCategoriesService };