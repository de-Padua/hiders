import React from "react";
import logo from "./assets/mental-health-svgrepo-com.svg";
import { FiShoppingBag, FiChevronDown } from "react-icons/fi";

export default function Navbar({
  totalItems,
  total,
  handleCartState,
  dropDown,
  handleDropDown,
  handleFulteredItem,
}) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const dropDownConfig = {
    top: dropDown ? "110px" : "20px",
    opacity: dropDown ? "1" : "0",
    pointerEvents: dropDown ? "auto" : "none",
  };
  return (
    <div className="navbar">
      <div className="logo">
        <h2>HIDER</h2>
      </div>
      <div className="links">
        <div className="sobre">
          <a>Sobre</a>
        </div>

        <div className="categorias">
          <a onClick={handleDropDown} className="categorias-btn-menu">
            {" "}
            Categorias
          </a>
          <div
            className="drop-down-menu"
            onClick={handleDropDown}
            style={dropDownConfig}
          >
            <p
              onClick={() => {
                handleFulteredItem("sapato");
              }}
            >
              Sapatos
            </p>
            <p
              onClick={() => {
                handleFulteredItem("mochila");
              }}
            >
              Mochilas
            </p>
            <p
              onClick={() => {
                handleFulteredItem("home");
              }}
            >
              Todos
            </p>
          </div>
        </div>
        <div
          className="cart-btn"
          onClick={() => {
            handleCartState();
          }}
        >
          <div className="cart-qnt">
            <FiShoppingBag className="cart-icon" />
            <p className="quantity-icon">{totalItems.length}</p>
          </div>
          <div>
            <p className="total-btn-cart">{formatter.format(total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
