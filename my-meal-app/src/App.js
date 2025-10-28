import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setCategories(response.data.categories);
      } catch (err) {
        setError("Gagal memuat data. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="loading">🔄 Sedang memuat data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1>🍽️ Daftar Kategori Makanan</h1>
      <div className="grid">
        {categories.map((category) => (
          <div className="card" key={category.idCategory}>
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="thumbnail"
            />
            <h2>{category.strCategory}</h2>
            <p>{category.strCategoryDescription.substring(0, 120)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
