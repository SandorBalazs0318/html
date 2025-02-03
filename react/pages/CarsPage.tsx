import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";
import { Product } from "../type/Cars";

const CarsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>("/cars");
        setProducts(response.data);
      } catch (err: any) {
        alert(err.message || "Hiba történt az autók lekérése közben.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Autók</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Brand</th>
            <th>ÉV</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.model}</td>
              <td>{product.brand}</td>
              <td>{product.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsPage;
