import NavShopee from "../components/NavShopee";
import Cart from "../components/Cart";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { productID } = useParams();
  console.log(productID);

  useEffect(() => {
    const URL = `http://localhost:3000/api/v1/item-category/general/${productID}`
  });

  return (
    <>
      <NavShopee />
      <div
        className="flex justify-between p-1.5 text-white font-roboto
  font-light text-[14px] bg-gradient-to-r h-[5.5rem] from-[#ee4d2d] to-[#ff7337]"
      >
        <Cart />
      </div>
      <div className="flex justify-between">
        <img />
        <div></div>
      </div>
    </>
  );
};

export default ItemDetail;
