import connectMongo from "./db";
import Product from "@/models/Product";

export async function getProducts() {
  await connectMongo();
  return Product.find({});
}

export async function createProduct(data) {
  await connectMongo();
  const newProduct = new Product(data);
  return newProduct.save();
}

export async function deleteProduct(id) {
  await connectMongo();
  return Product.findByIdAndDelete(id);
}
