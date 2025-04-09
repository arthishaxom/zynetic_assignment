export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;

  returnPolicy: string;
  thumbnail: string;
  images: string[];
}
