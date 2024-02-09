interface Recipe {
    description: string;
    id: number;
    image_url: string;
    ingredients: {
        name: string;
        quantity: string;
    }[];
    name: string;
}