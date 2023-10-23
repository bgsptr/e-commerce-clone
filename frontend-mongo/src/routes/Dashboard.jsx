import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import _ from "lodash";
import { makeQuery } from "./makeQuery.mjs";

const Dashboard = () => {
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken);
  const [profile, setProfile] = useState({});
  const [toogle, setToogle] = useState(false);
  const [categories, setCategories] = useState([]);

  const toogleDropdown = () => {
    toogle ? setToogle(false) : setToogle(true);
  };
  const navigate = useNavigate();

  const destroyToken = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const url = "http://localhost:3000/api/v1/item-category";
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((category) => {
        setCategories(category.newData);
      })
      .catch((err) => console.log(err));
  }, [categories]);

  useEffect(() => {
    const url = "http://localhost:3000/api/v1/users/me";
    const option = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(url, option)
      .then((res) => res.json())
      .then((response) => setProfile(response))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {token ? (
        <div>
          <div className="flex justify-between p-4 bg-[#b6895b]">
            <div>Shopee</div>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md
                bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1
                ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={toogleDropdown}
                >
                  {profile.username}
                </button>
              </div>
              {toogle && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 rounded-md
            bg-white shadow-lg ring-1 ring-black ring-opacity-5
            focus:outline-none"
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Account settings
                    </a>
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-1"
                    >
                      My Favorite
                    </a>
                    <a
                      href="login"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      id="menu-item-2"
                      onClick={destroyToken}
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              )}
              <Cart />
            </div>
          </div>
          <div className="flex flex-wrap">
            {categories.map((cate, i) => {
              return (
                <div
                  key={cate.id}
                  className="w-[33%] shadow-md overflow-hidden rounded px-6 py-4"
                >
                  <div className="font-semibold">{cate.name}</div>
                  <img className="w-full" src="" alt={cate.name} />
                  <Link
                    to={`../product/${_.kebabCase(cate.name)}?${makeQuery({
                      id: cate.id,
                    })}`}
                  >
                    See More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>hai</div>
      )}
    </>
  );
};

export default Dashboard;
