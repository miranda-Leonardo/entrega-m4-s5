import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IUserRequest, IUserResponse } from '../interfaces/users';

const userCreateSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required()
});

const userResponseSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
});

const listUsersSerializer: SchemaOf<IUserResponse[]> = yup.array(userResponseSerializer);

export { userCreateSerializer, userResponseSerializer, listUsersSerializer };