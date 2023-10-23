import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import NavShopee from "../components/NavShopee";
import _ from "lodash";

const GeneralItem = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const urlQuery = new URLSearchParams(location.search);
  const query = parseInt(urlQuery.get("id"), 10);
  useEffect(() => {
    const url = `http://localhost:3000/api/v1/item-category/general/${query}`;
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
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="">
      <NavShopee />
      {console.log(data)}
      <div className="mt-3 flex justify-between">
        <div className="flex flex-col w-[10rem]">
          <div className="category">
            <div>
              <span></span>Semua Kategori
            </div>
            <div></div>
          </div>
          <div className="filter">
            <div>
              <span></span>Filter
            </div>
          </div>
          <div className="seller-type">
            <input />
            <div></div>
          </div>
          <div className="payment-method">
            <input />
            <div></div>
          </div>
          <div className="shipping-option">
            <input />
            <div></div>
          </div>
        </div>
        <div className="flex w-[20%]">
          {data.map((el) => {
            return (
              <Link to={`../../${_.kebabCase(el.specific_item_name)}`}
                key={el.SKU}
                className="flex flex-col max-w-sm mx-1 my-4 border-2"
              >
                <img src={el.img_item} className="img-item-name" />
                <div>{el.specific_item_name}</div>
                {/* <ItemReview /> */}
                <div>Rp<span>{el.price_item}</span></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralItem;
