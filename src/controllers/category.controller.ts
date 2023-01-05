import { Request, Response } from 'express';
import { ICategoryRequest } from '../interfaces/categories';
import { createCategoryService } from '../services/categories/createCategory.service';
import { listCategoriesService } from '../services/categories/listCategories.service';
import { listAllPropertiesCategoryService } from '../services/categories/listPropertiesOfCategory.service';

const createCategoryController = async ( req: Request, res: Response ) => {
    const categoryData: ICategoryRequest = req.body;
    const createdCategory = await createCategoryService( categoryData );
    return res.status(201).json(createdCategory);
};

const listCategoriesController = async ( req: Request, res: Response ) => {
    const categories = await listCategoriesService();
    return res.json(categories);
};

const listAllPropertiesCategoryController = async ( req: Request, res: Response ) => {
    const categoryId: string = req.params.id;
    const allPropertiesCategory = await listAllPropertiesCategoryService( categoryId );
    return res.json(allPropertiesCategory);
};

export { createCategoryController, listCategoriesController, listAllPropertiesCategoryController };