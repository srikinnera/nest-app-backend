export interface Product {
    id: string;
    sku: string;
    name: string;
    type: string;
    description: string;
    color: string;
    price: number;
  }

  export interface ProductResponse {
    products: Product[];
    length: number;
  }

  export interface OutputResponse {
    message: string;
  }


  