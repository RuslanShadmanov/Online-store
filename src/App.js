import React, { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./components/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarComponent } from "./components/NavbarComponent";
import { act } from "react-dom/test-utils";
const App = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    document.title = activeCategory;
    const favFromStorage = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(favFromStorage);
  }, []);
  useEffect(() => {
    document.title = `${activeCategory} (${favorites.length})`;
  }, [activeCategory, favorites]);
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
    getCategories(data);
  };
  const getCategories = (data) => {
    const allCategories = [
      ...new Set(
        data.reduce(
          (acc, item) => {
            acc.push(item.category);
            return acc;
          },
          ["ALL"]
        )
      ),
    ];
    setCategories(allCategories);
  };
  const toggleFavorites = (productId) => {
    const ifExists = favorites.some((product) => product.id === productId);
    if (ifExists) {
      const newFavorites = favorites.filter(
        (product) => product.id !== productId
      );
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      const newFavProduct = products.find(
        (product) => product.id === productId
      );
      const arr = [...favorites, newFavProduct];
      setFavorites(arr);
      localStorage.setItem("favorites", JSON.stringify(arr));
    }
  };
  return (
    <div className="App">
      <div>
        <NavbarComponent
          setActiveCategory={setActiveCategory}
          categories={categories}
          activeCategory={activeCategory}
        />
      </div>
      <div className="products-wrapper">
        {products.map((product) => {
          return (
            <Product
              {...product}
              toggleFavorites={toggleFavorites}
              favorites={favorites}
            />
          );
        })}
      </div>
    </div>
  );
};
export default App;
