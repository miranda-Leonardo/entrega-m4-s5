import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IUserRequest, IUserResponse, IUserUpdate } from '../interfaces/users';

const createUserSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required()
});

const responseUserSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required()
});

const listUsersSerializer: SchemaOf<IUserResponse[]> = yup.array(responseUserSerializer);

const updateUserSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired()
});

export { createUserSerializer, responseUserSerializer, listUsersSerializer, updateUserSerializer };