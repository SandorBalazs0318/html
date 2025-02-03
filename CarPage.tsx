import React, { useEffect, useState } from "react";
import apiClient from "../api/ApiClient";
import { Product } from "../type/Cars";
import { useParams } from "react-router-dom";

const CarPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get<Product>(`/cars/${id}`);
        setProduct(response.data);
        setNewStock(response.data.year);
      } catch (err: any) {
        alert(err.message || "Hiba történt az autó lekérése közben.");
      }
    };

    fetchProduct();
  }, [id]);

  const updateStock = async () => {
    if (newStock < 0) {
      alert("Érvényes évjárat értéket adj meg!");
      return;
    }

    try {
      await apiClient.put(`/cars/${id}`, { keszlet: newStock });
      if (product) {
        const updatedProduct: Product = {
          ...product,
          keszlet: newStock,
        };
        setProduct(updatedProduct);
      }
      alert("Évjárat sikeresen frissítve!");
    } catch (err: any) {
      alert(err.message || "Hiba történt a évjárat frissítése közben.");
    }
  };

  const deleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Biztosan törölni szeretnéd ezt az autót?"
    );
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/cars/${id}`);
      alert("Autó sikeresen törölve!");
    } catch (err: any) {
      alert(err.message || "Hiba történt az autó törlése közben.");
    }
  };

  return (
    <div>
      <h1>Autó részletei</h1>
      {product ? (
        <div>
          <p>
            <strong>Id:</strong> {product.id}
          </p>
          <p>
            <strong>Model:</strong> {product.model}
          </p>
          <p>
            <strong>Márka:</strong> {product.brand} 
          </p>
          <p>
            <strong>Év:</strong> {product.year} 
          </p>
          <input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(Number(e.target.value))}
            placeholder="Új Évjárat"
          />
          <button onClick={updateStock}>Autó frissítése</button>
          <p>
            <strong>Leírás:</strong> {product.leiras}
          </p>
          <button onClick={deleteProduct} style={{ color: "red" }}>
            Autó törlése
          </button>
        </div>
      ) : (
        <p>Nincs ilyen autó.</p>
      )}
    </div>
  );
};

export default CarPage;