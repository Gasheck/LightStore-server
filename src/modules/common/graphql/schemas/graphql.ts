
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface AttributeInput {
    name: string;
    type: string;
}

export interface CreateProductInput {
    name: string;
    quantity?: number;
    price?: number;
    description?: string;
    type: string;
    attributes?: ProductAttributeInput[];
}

export interface CreateTypeInput {
    name: string;
    attributes?: AttributeInput[];
}

export interface ProductAttributeInput {
    id: string;
    value: string;
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

export interface Image {
    id: string;
    filename: string;
}

export interface IMutation {
    createProduct(productInput?: CreateProductInput[]): Product[] | Promise<Product[]>;
    updateProduct(productInput?: UpdateProductInput): Product | Promise<Product>;
    removeProduct(id: string): string | Promise<string>;
    createType(typeInput?: CreateTypeInput[]): Type[] | Promise<Type[]>;
    removeType(id: string[]): string[] | Promise<string[]>;
    updateType(typeInput?: UpdateTypeInput): Type | Promise<Type>;
}

export interface Product {
    id: string;
    name: string;
    price: string;
    quantity: number;
    description: string;
    type: Type;
    attributes: ProductAttribute[];
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
