"use client";
import React, { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";

export default function Dashboard() {
  const { products, fetchProducts, deleteProduct, updateProduct } = useProduct();
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: "", description: "", price: "" });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setEditedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleSaveClick = async (id) => {
    await updateProduct(id, editedProduct);
    setEditingProductId(null); // Exit edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-[24px] font-semibold text-center my-6 text-[#444]">Dashboard</h2>
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">Product Name</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Description</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">Price</th>
                    <th className="relative py-3.5 px-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No products found</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                          {editingProductId === product._id ? (
                            <input
                              type="text"
                              name="name"
                              value={editedProduct.name}
                              onChange={handleChange}
                              className="border border-gray-200 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            product.name
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {editingProductId === product._id ? (
                            <input
                              type="text"
                              name="description"
                              value={editedProduct.description}
                              onChange={handleChange}
                              className="border border-gray-200 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            product.description.slice(0, 20) + (product.description.length > 20 ? "..." : "")
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {editingProductId === product._id ? (
                            <input
                              type="number"
                              name="price"
                              value={editedProduct.price}
                              onChange={handleChange}
                              className="border border-gray-200 rounded px-2 py-1 w-full"
                            />
                          ) : (
                            `$${product.price}`
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-4">
                            {editingProductId === product._id ? (
                              <button
                                onClick={() => handleSaveClick(product._id)}
                                className="text-green-500 hover:text-green-700"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEditClick(product)}
                                className="text-blue-500 hover:text-indigo-500"
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
