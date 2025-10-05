import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("rating", { ascending: false });
      if (error) console.error(error);
      else setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — ${p.price} ⭐ {p.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
