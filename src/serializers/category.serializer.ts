import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { ICategoryRequest, ICategoryResponse } from '../interfaces/categories';

const createCategorySerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
    name: yup.string().required()
});

const responseCategorySerializer: SchemaOf<ICategoryResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required()
});

export { createCategorySerializer, responseCategorySerializer };