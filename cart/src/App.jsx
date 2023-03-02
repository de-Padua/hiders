import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [data, setData] = useState(null);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [filterItems, setFilterItems] = useState(null);
  const [item, setItem] = useState(null);
  const [value, setValue] = useState(0);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [cartValue, setTotalCartValue] = useState();
  const [cartState, setCartState] = useState(false);
  const [buy, setBuy] = useState(false);

  <ToastContainer />;
  const notify = () => {
    toast.warn("Item já está no carrinho", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyAdded = () => {
    toast.success("Item adicionado no carrinho", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handlesetBuyf = () => {
    if (cart.length === 0) {
      const rejectBuy = new Promise((resolve, reject) =>
        setTimeout(reject, 3000)
      );
      toast.promise(rejectBuy, {
        pending: "A compra está sendo finalizada",
        success: "Compra concluída! A nota fiscal foi enviada ao seu email. ",
        error: "Algo deu errado ! 🤯",
      });
    } else {
      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      toast.promise(resolveAfter3Sec, {
        pending: "A compra está sendo finalizada",
        success: "Compra concluída! A nota fiscal foi enviada ao seu email. ",
        error: "Algo deu errado !   🤯",
      });
      setTimeout(() => {
        setCart([]);
      }, 1500);
    }
  };
  function handleDropDown() {
    setDropDownMenu((oldValue) => (oldValue = !oldValue));
  }
  function getFilteredItems(filteredItem) {
    if (filteredItem === "home") {
      setFilterItems(null);
      setItem(Product({ data, handleAddToCart: addToCart }));
    } else {
      setFilterItems(filteredItem);
    }
  }
  function addToCart(item) {
    //check duplicates
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const found = cartItems.find((duplicate) => {
      return duplicate.item.id === item.id;
    });
    if (found) {
      notify();
    } else {
      notifyAdded();
      setCart((previusValue) => [...previusValue, { item, quantidade: 1 }]);
    }
  }
  function increaseF(select) {
    let foundItem = cart.find((x) => {
      return x.item.id === select.item.id;
    });
    foundItem.quantidade = foundItem.quantidade + 1;
    let newCart = cart.slice();

    setCart(newCart);
  }
  function removerItem(select) {
    let newCartItems = cart.filter((cartItems) => {
      return cartItems.item.id != select.item.id;
    });

    setCart(newCartItems);
  }

  function decreaseF(select) {
    let foundItem = cart.find((x) => {
      return x.item.id === select.item.id;
    });
    if (foundItem.quantidade < 2) {
      return;
    } else {
      foundItem.quantidade = foundItem.quantidade - 1;
      let newCart = cart.slice();
      setCart(newCart);
    }
  }
  function removerItem(select) {
    let newCartItems = cart.filter((cartItems) => {
      return cartItems.item.id != select.item.id;
    });

    setCart(newCartItems);
  }

  function getTotalValue() {
    if (cart.length === 0) {
      setValue(0);
    } else {
      const y = cart.map((x) => {
        return x.item.price * x.quantidade;
      });
      const p = y.reduce((acc, v) => {
        return acc + v;
      });
      setValue(p);
    }
  }
  function changeState() {
    setCartState((oldValue) => (oldValue = !oldValue));
  }

  useEffect(() => {
    fetch("./products.json")
      .then((resp) => resp.json())
      .then((json) => setData(json));
  }, []);
  useEffect(() => {
    if (filterItems === null) {
      return;
    } else {
      const w = JSON.parse(localStorage.getItem("products"));
      const newArr = w.filter((x) => {
        return x.category === filterItems;
      });
      const data = newArr;
      setItem(Product({ data, handleAddToCart: addToCart }));
    }
  }, [filterItems]);
  useEffect(() => {
    if (data === null) {
      return;
    } else {
      setItem(Product({ data, handleAddToCart: addToCart }));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    getTotalValue();
  }, [cart]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      ;
      <Navbar
        totalItems={cart}
        total={value}
        handleCartState={changeState}
        dropDown={dropDownMenu}
        handleDropDown={handleDropDown}
        handleFulteredItem={getFilteredItems}
      />
      <Cart
        totalValue={cart}
        increaseQuantidade={increaseF}
        decreaseQuantidade={decreaseF}
        removerItem={removerItem}
        total={value}
        state={cartState}
        handleCartState={changeState}
        handlesetBuy={handlesetBuyf}
      />
      <div className="container-main"> {item}</div>
    </>
  );
}
