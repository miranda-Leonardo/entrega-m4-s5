export interface IAddressRequest {
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
}

export interface IPropertyRequest {
    value: number
    size: number
    address: IAddressRequest
    categoryId: string
}

export interface IPropertyResponse {
    id: string,
    sold: boolean,
    value: number,
    size: number,
    createdAt: Date,
    updatedAt: Date
};