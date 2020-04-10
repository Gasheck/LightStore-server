
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface CreateProductInput {
    name: string;
    quantity?: number;
    price?: number;
    description?: string;
    type: string;
}

export interface CreateTypeInput {
    name: string;
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
}

export interface IQuery {
    products(): Product[] | Promise<Product[]>;
    types(): Type[] | Promise<Type[]>;
    images(): Image[] | Promise<Image[]>;
}

export interface Type {
    id: string;
    name: string;
}
