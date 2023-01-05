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
    address: IAddressResponse
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