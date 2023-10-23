import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import _ from "lodash";
import { makeQuery } from "./makeQuery.mjs";

const ItemCategory = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const urlQuery = new URLSearchParams(location.search);
  const id = parseInt(urlQuery.get("id"), 10);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const url = `http://localhost:3000/api/v1/item-category/${id}`;
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
      .then((response) => setItems(response.newData))
      .catch((err) => console.log(err));
  });

  return (
    <div className="flex flex-wrap">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="w-[33%] shadow-md overflow-hidden rounded px-6 py-4"
          >
            <Link to={`${_.kebabCase(item.name)}?${makeQuery({id: item.id})}`}>{item.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ItemCategory;
