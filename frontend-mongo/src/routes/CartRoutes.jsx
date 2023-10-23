import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavShopee from "../components/NavShopee";

const CartRoutes = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [qtyInput, setQtyInput] = useState([]);
  const [carts, setCarts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [checkState, setCheckState] = useState(false);
  const [qty, setQty] = useState([
    {
      cart_id: 0,
      qty: 0,
      price_item: 0,
      active: false,
    },
  ]);

  useEffect(() => {
    const baseURL = "http://localhost:3000/api/v1/carts";
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(baseURL, option)
      .then((res) => res.json())
      .then((response) => {
        setCarts(response);
        // console.log(response);
        const initialQty = response.map((cart) => ({
          cart_id: cart.cart_id,
          qty: cart.qty,
          price_item: cart.price_item,
          active: false,
        }));
        setQty(initialQty);
        setQtyInput(initialQty.map((el) => el.qty));
      })
      .catch((err) => console.log(err));
  }, []);

  const patchQty = (i, cartID, cartQty) => {
    if (cartQty === 0) {
      return;
    }
    const updateQTY = (qty) => {
      const updatedQty = [...qty];
      updatedQty[i].qty = cartQty;
      return updatedQty;
    };
    const updatedQty = updateQTY(qty);
    setQty(updatedQty);
    console.log(qty);

    const priceCheckout = updatedQty
      .filter((el) => el.active)
      .reduce((prevPrice, el) => prevPrice + el.price_item * el.qty, 0);
    setTotalPrice(priceCheckout);

    window.addEventListener("beforeunload", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleLoad);
    };
  };

  const handleLoad = () => {
    qty.map((el) => {
      console.log(el.cart_id);
      const baseUrl = `http://localhost:3000/api/v1/carts/${el.cart_id}`;
      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: el.qty,
        }),
      };
      fetch(baseUrl, options)
        .then((response) => response.json())
        .then((updatedCart) => {
          console.log(updatedCart);

          setQtyInput(updatedCart.map((el) => el.qty));
        })
        .catch((err) => console.error(err));
    });
  };

  const deleteCart = (cartID) => {
    const baseUrl = `http://localhost:3000/api/v1/carts/${cartID}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(baseUrl, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((response) => {
        setCarts((cartsEl) =>
          cartsEl.filter((cart) => cart.cart_id !== cartID)
        );
        navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checked = (e) => {
    // INGAT parseInt nanti menyesal debugging 2 jam
    const cartID = parseInt(e.target.value);
    const updatedQty = [...qty];
    const index = updatedQty.findIndex((el) => {
      // SEKARANG PAKE RETURN INGAT
      return el.cart_id === cartID;
    });

    if (index !== -1) {
      updatedQty[index].active = e.target.checked;
      setQty(updatedQty);
      // console.log(qty);
    }

    const updateQty = updatedQty.filter((el) => {
      return el.active === true;
    });
    setTotalCart(updateQty.length);
    const priceCheckout = updatedQty
      .filter((el) => el.active)
      .reduce((prevPrice, el) => prevPrice + el.price_item * el.qty, 0);
    setTotalPrice(priceCheckout);
  };

  // const toggleListCart = (el, className, add) => {
  //   // console.log(el);
  //   for (let i = 0; i < el.length; i++) {
  //     if (add) {
  //       el[i].classList.add(className);
  //     } else {
  //       el[i].classList.remove(className);
  //     }
  //   }
  //   const doc = document.querySelectorAll(".item-cart");
  //   // console.log(doc);
  //   for (let i = 0; i < doc.length; i++) {
  //     if (!doc[i].classList.contains("checklist-active")) {
  //       setCheckState(false);
  //     } else {
  //       setCheckState(true);
  //     }
  //   }
  // };

  // const toggleCartCheckbox = (e) => {
  //   const element = document.querySelectorAll(".item-cart");
  //   // console.log(element);
  //   const isChecked = e.target.checked;
  //   toggleListCart(element, "checklist-active", isChecked);
  // };

  const changeHandler = (e, i, cartIdHandler) => {
    const qtyTarget = e.target.value.replace(/[^0-9]/g, "");
    const newQtyInput = isNaN(qtyTarget) ? "" : parseInt(qtyTarget, 10);
    const updateQty = [...qty];
    updateQty[i].qty = newQtyInput;
    setQty(updateQty);
    patchQty(i, cartIdHandler, newQtyInput);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const index = qty.filter((el) => el.active);
    console.log(index);
  };

  const checkoutHandler = () => {
      const url = "http://localhost:3000/api/v1/payment";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("snapToken", `${data.token}`);
          navigate("/checkout")
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className="block h-[2000px] bg-gray-300">
      <NavShopee />
      <div className="flex justify-between h-24 bg-white">
        <div className=""></div>
        <div className="my-7 mx-2 flex align-center">
          <input
            className="border-2 border-[#ee4d2d] w-[32rem] font-roboto
              text-sm px-3"
            placeholder="Gratis Ongkir Rp-0"
          />
          <button
            aria-label="search"
            type="submit"
            className="flex justify-center items-center bg-[#ee4d2d] w-20 px-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="px-2 flex justify-between items-center bg-white my-4">
        <div className="flex items-center">
          {/* <input type="checkbox" className="w-5 h-5 accent-[#ee4d2d]" /> */}
          <div className="p-4">Produk</div>
        </div>
        <div className="flex gap-x-10 py-4 my-3 mr-8 align-center text-slate-700 font-medium">
          <div>Harga Satuan</div>
          <div>Kuantitas</div>
          <div>Total Harga</div>
          <div>Aksi</div>
        </div>
      </div>
      <div className=""></div>
      {/* <form onSubmit={submitHandler}> */}
      {carts.map((cart, i) => {
        return (
          <div
            name="cartID"
            value={cart.cart_id}
            key={cart.cart_id}
            className="flex justify-between gap-x-2 w-full border-[1px] 
              py-4 px-2 bg-white"
          >
            <div className="flex items-center">
              <input
                aria-label="checkbox-input"
                type="checkbox"
                className="w-5 h-5 accent-[#ee4d2d] item-cart"
                onClick={checked}
                name="cart_id"
                // checked={checkState}
                value={cart.cart_id}
                key={cart.cart_id}
              />
              <div className="p-4">{cart.specific_item_name}</div>
            </div>
            <div className="flex gap-x-10 p-4 items-center">
              <div>{`Rp${cart.price_item}`}</div>
              <div className="flex items-center h-full">
                <span
                  onClick={patchQty.bind(this, i, cart.cart_id, qty[i].qty - 1)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    className="border-2"
                  >
                    <path d="M5 11h14v2H5z"></path>
                  </svg>
                </span>
                <input
                  value={qty[i].qty}
                  // value={qtyInput[i]}
                  min="1"
                  className="w-[42px] text-center
                  border-y-2 h-full"
                  onChange={(e) => changeHandler(e, i, cart.cart_id)}
                />
                {/* {qty[i]} */}
                <span
                  onClick={patchQty.bind(this, i, cart.cart_id, qty[i].qty + 1)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    className="border-2"
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>
                </span>
              </div>
              <div className="text-[#ee4d2d]">{`Rp${
                qty[i].qty * qty[i].price_item
              }`}</div>
              <span
                onClick={deleteCart.bind(this, cart.cart_id)}
                className="hover:text-[#b6895b] cursor-pointer"
              >
                Hapus
              </span>
            </div>
          </div>
        );
      })}
      <div className="fixed bottom-0 left-0 w-full flex justify-between bg-white z-[10] p-4">
        <div className="flex items-end">
          <input
            type="checkbox"
            className="w-5 h-5 mb-6 ml-4 accent-[#ee4d2d]"
            // onClick={toggleCartCheckbox}
          />
          <div className="p-4 ml-1 mb-2">Pilih Semua {`(${qty.length})`}</div>
          <div className="p-4 ml-3 mb-2">Hapus</div>
          <div className="p-4 ml-3 mb-2 text-[#ee4d2d]">
            Tambahkan ke Favorit
          </div>
        </div>
        <div className="flex flex-col justify-between relative">
          <div className="flex gap-x-20 p-1 relative">
            <div className="p-2 font-semibold text-lg">Voucher Shopee</div>
            <div className="text-blue-800 p-1 relative right-5 text-md">
              Gunakan/ masukkan kode
            </div>
          </div>
          <div className="flex justify-between">
            <div className="relative text-gray-400 font-medium text-sm">
              Saldo Koin Tidak Cukup
            </div>
            <div className="text-gray-400 font-bold text-md relative right-[2rem]">
              -Rp0
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="flex relative right-[3rem] items-center">
                <div className="text-lg p-1">
                  Total {`${totalCart} produk`}:
                </div>
                <span className="text-[#ee4d2d] font-semibold text-2xl">
                  {`Rp${totalPrice}`}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="gray"
                >
                  <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path>
                </svg>
              </div>
              <div className="relative left-[6rem] text-sm">
                Hemat{" "}
                <span className="relative left-4 text-[#ee4d2d]">
                  Rp285,6RB
                </span>
              </div>
            </div>
            <button
              aria-label="checkout"
              className="bg-[#ee4d2d] text-white
              relative right-5 w-48 z-999 p-2.5 m-4 rounded-sm"
              onClick={checkoutHandler}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default CartRoutes;
