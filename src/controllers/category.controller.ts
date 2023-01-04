import { Request, Response } from 'express';
import { ICategoryRequest } from '../interfaces/categories';
import { createCategoryService } from '../services/categories/createCategory.service';
import { listCategoriesService } from '../services/categories/listCategories.service';

const createCategoryController = async ( req: Request, res: Response ) => {
    const categoryData: ICategoryRequest = req.body;
    const createdCategory = await createCategoryService( categoryData );
    return res.status(201).json(createdCategory);
};

const listCategoriesController = async ( req: Request, res: Response ) => {
    const categories = await listCategoriesService();
    return res.json(categories);
};

export { createCategoryController, listCategoriesController };