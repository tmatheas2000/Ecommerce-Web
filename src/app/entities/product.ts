export interface Product{
    category ?: string;
    description ?: string;
    id ?: number;
    image ?: string;
    price ?: number;
    title ?: string;
    quantity ?: number;
}

export interface cartProduct{
    productId: number;
    quantity: number;
}
export interface Cart{
    date: string;
    id: number;
    products: cartProduct[];
    userId: number;
}