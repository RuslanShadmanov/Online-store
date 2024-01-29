import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { NavbarComponent } from "./components/NavbarComponent";
import { Cart } from "./components/Cart";
import { List } from "./components/List";
import { FullProductPage } from "./components/FullProductPage";
const App = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetchProducts();
    document.title = activeCategory;
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
  const addToCart = (id) => {
    const ifExists = cart.some((product) => product.id === id);
    if (!ifExists) {
      const newProduct = products.find((product) => product.id === id);
      setCart([...cart, { ...newProduct, quantity: 1 }]);
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    }
  };
  const toggleFavorites = (productId) => {
    const ifExists = favorites.some((product) => product.id === productId);
    if (ifExists) {
      const newFavorites = favorites.filter(
        (product) => product.id !== productId
      );
      setFavorites(newFavorites);
    } else {
      const newFavProduct = products.find(
        (product) => product.id === productId
      );
      const arr = [...favorites, newFavProduct];
      setFavorites(arr);
    }
  };
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <NavbarComponent
            setActiveCategory={setActiveCategory}
            categories={categories}
            activeCategory={activeCategory}
          />
        </div>
        <Routes>
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route
            path="/"
            element={
              <List
                renderedProducts={products}
                favorites={favorites}
                addToCart={addToCart}
                toggleFavorites={toggleFavorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <List
                renderedProducts={favorites}
                favorites={favorites}
                addToCart={addToCart}
                toggleFavorites={toggleFavorites}
              />
            }
          />
          <Route
            path={`/${activeCategory.replaceAll(" ", "-")}`}
            element={
              <List
                renderedProducts={products.filter(
                  (product) => product.category === activeCategory
                )}
                favorites={favorites}
                addToCart={addToCart}
                toggleFavorites={toggleFavorites}
              />
            }
          />
          <Route
            path="/products/:id"
            element={<FullProductPage products={products} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
