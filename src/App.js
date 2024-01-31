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



//class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) { //TC: O(1)
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            this.tail.next = newNode
        }
        this.tail = newNode;
        this.length++;
    }

    shift() { // TC: O(1)
        if (this.head === null) return;
        const result = this.head.value;
        const nextNode = this.head.next;
        this.head = nextNode;
        if (this.head === null) this.tail = null
        this.length--;
        return result;
    }

    // adding to the beginning of the LinkedList
    unshift(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
    }
    pop() {
        // if (this.length == 0) return
        if (this.head === null) return;
        let current = this.head;
        let prev = null;
        while (current !=  this.tail) {
            prev = current;
            current = current.next;
        }
        if (this.length === 1) {
            this.head == null
        } else {
            prev.next = null    
        }
        this.tail = prev;
        this.length--;
        return current.value;
    }

    getNode(index) {
        if (index < 0 || index > this.length) return null;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    // 1. set a value of the node at a given index
        // get the node using getNode method
        // change the value of the node
    // 2. insert a node at a given index
        // 2.1. if index is 0 => call method unshift(value)
        // 2.2. if index is equal to length => call push(value)
        // 2.3. if somewhere in the middle => use three pointers prev, curr, next
    
// }

// const lineUp = new LinkedList()
// lineUp.push("Bekzhan")
// lineUp.push("Atai")
// lineUp.push("Aizirek")

// lineUp.shift()
// lineUp.shift()
// lineUp.shift()

// // const array = [2, 5, 7, 8]
// // array[2]

// lineUp.push("Nuradil")
// lineUp.push("Gulira")

// lineUp.unshift("Stefan")

// console.log(lineUp)

// head                    tail
// "Bekzhan" => "Atai" => "Aizirek"