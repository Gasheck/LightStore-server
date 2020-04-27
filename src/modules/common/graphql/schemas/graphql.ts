
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface AttributeInput {
    name: string;
    type: string;
}

export interface AttributeValueInput {
    id: string;
    value: StringOrInt;
}

export interface CreateProductInput {
    name: string;
    quantity?: number;
    price?: number;
    description?: string;
    type: string;
    attributes: AttributeValueInput[];
}

export interface CreateTypeInput {
    name: string;
    attributes?: AttributeInput[];
}

export interface UpdateProductInput {
    id: string;
    name?: string;
    quantity?: number;
    price?: number;
    description?: string;
    type?: string;
}

export interface UpdateTypeInput {
    id: string;
    type: CreateTypeInput;
    attributes?: AttributeInput[];
    attribute_type?: string;
}

export interface Attribute {
    id: string;
    name: string;
    type: string;
}

export interface AttributeValue {
    id: string;
    value: StringOrInt;
}

export interface Image {
    id: string;
    filename: string;
}

export interface IMutation {
    createProduct(productInput?: CreateProductInput[]): Product[] | Promise<Product[]>;
    removeProduct(id: string[]): Product[] | Promise<Product[]>;
    updateProduct(productInput?: UpdateProductInput): Product | Promise<Product>;
    createType(typeInput?: CreateTypeInput[]): Type[] | Promise<Type[]>;
    removeType(id: string[]): Type[] | Promise<Type[]>;
    updateType(typeInput?: UpdateTypeInput): Type | Promise<Type>;
}

export interface Product {
    id: string;
    name: string;
    price: string;
    quantity: number;
    description: string;
    type: Type;
    attributes: AttributeValue[];
}

export interface ProductAttribute {
    id: string;
    name: string;
    value: string;
}

export interface IQuery {
    products(): Product[] | Promise<Product[]>;
    types(): Type[] | Promise<Type[]>;
    images(): Image[] | Promise<Image[]>;
}

export interface Type {
    id: string;
    name: string;
    attributes: Attribute[];
}

export type StringOrInt = any;
