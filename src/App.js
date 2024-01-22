import React, { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./components/Product";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarComponent } from "./components/NavbarComponent";
import { Cart } from "./components/Cart";
import { act } from "react-dom/test-utils";
const App = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [categories, setCategories] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

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
          setIsCartOpen={setIsCartOpen}
          isCartOpen={isCartOpen}
        />
      </div>
      {isCartOpen ? (
        <Cart cart={cart} />
      ) : (
        <div className="products-wrapper">
          {products.map((product) => {
            return (
              <Product
                {...product}
                toggleFavorites={toggleFavorites}
                favorites={favorites}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default App;
