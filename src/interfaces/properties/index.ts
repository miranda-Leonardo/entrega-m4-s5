import { Address } from "../../entities/addresses.entity"
import { Category } from "../../entities/categories.entity"

export interface IAddressRequest {
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
}

export interface IAddressResponse {
    id: string
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
};

export interface IPropertyRequest {
    value: number
    size: number
    address: IAddressRequest
    categoryId: string
}

export interface IPropertyWithAddressResponse {
    id: string
    sold: boolean
    value: number
    size: number
    category: Category
    address: Address
    createdAt: Date
    updatedAt: Date
};

export interface IPropertyResponse {
    id: string
    sold: boolean
    value: number
    size: number
    createdAt: Date
    updatedAt: Date
};