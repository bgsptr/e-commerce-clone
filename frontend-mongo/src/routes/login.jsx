import { useState, useEffect } from "react";
// import Nav from "../components/Nav";
import { herobg } from "../assets/images";
// import Button from "../components/Button";
// import { arrowRight } from "../assets/icons";

import { useNavigate } from "react-router-dom";

import { ComputersCanvas } from "../components/3d/canvas/index";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const header = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getData = async () => {
      const baseURL = "http://localhost:3000/api/v1/users/me";
      const option = {
        method: "GET",
        headers: header,
      };
      const response = await fetch(baseURL, option);
      const dataJSON = await response.json();
      setCarts(dataJSON);
      setLoading(false);
    };
    getData();
  }, [token]);

  const whenSubmitted = (event) => {
    event.preventDefault();
    console.log(data);
    const authO = async () => {
      console.log(data);
      const baseURL = "http://localhost:3000/api/v1/users/login";
      const option = {
        method: "POST",
        headers: {
          Authorization: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(data),
      };
      const response = await fetch(baseURL, option);
      console.log(option);
      return await response.json();
    };
    authO()
      .then((res) => {
        localStorage.setItem("token", res.token);
        const cookieToken = localStorage.getItem("token");
        setToken(cookieToken);
      })
      .catch((err) => console.log(err));
    setData({
      username: "",
      password: "",
    });
  };

  const whenChanged = (event) => {
    const { name, value } = event.target;
    const temp = {
      ...data,
      [name]: value,
    };
    setData(temp);
  };
  return (
    <section className="relative h-screen mx-auto">
      <div
        style={{ backgroundImage: `url(${herobg})` }}
        className="flex justify-around items-center 
    relative w-full min-h-screen text-white bg-cover max-md:flex-col"
      >
        {localStorage.getItem("token") ? (
          navigate("/dashboard")
        ) : (
          <>
            <div className="w-[500px] h-[500px]">
              <ComputersCanvas />
            </div>
            <div className="h-[500px]">
              <form
                onSubmit={whenSubmitted.bind(this)}
                className="flex max-md:justify-start content-center
          flex-col gap-2 px-2
          bg-transparent w-[300px]"
              >
                <h2
                  className="font-montserrat font-extrabold mt-8 mb-10
          text-2xl text-center"
                >
                  Login
                </h2>
                <span className="font-montserrat font-medium">Username</span>
                <input
                  type="text"
                  name="username"
                  className="username text-white border-b-2
            p-1 border-slate-50 
            bg-transparent outline-none"
                  value={data.username}
                  onChange={whenChanged.bind(this)}
                  required
                />

                <span
                  className="font-montserrat 
          font-medium mt-10"
                >
                  Password
                </span>
                <input
                  type="text"
                  name="password"
                  className="password text-white bg-transparent 
            p-1 border-slate-50 
            border-b-2 outline-none"
                  value={data.password}
                  onChange={whenChanged.bind(this)}
                  required
                />
                <button type="submit" label="Submit">
                  Click
                </button>
                <div className="flex justify-between mt-5">
                  <a href="#">Forgot Password</a>
                  <a href="#">Register</a>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Login;

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//         };
//         this.whenSubmitted = this.whenSubmitted.bind(this);
//         this.whenChanged = this.whenChanged.bind(this);
//     }
//     whenSubmitted(event) {
//         event.preventDefault();
//         console.log("data: ", this.state);
//         this.setState({
//             username: '',
//             password: '',
//         });
//     }
//     whenChanged(event) {
//         const {name, value}  = event.target;
//         const data = {
//             [name]: value
//         }
//         this.setState(data);
//     }
//     componentDidMount() {

//     }
//     render() {
//         return (
//             <form onSubmit={this.whenSubmitted}>
//                 <input type="text" name="username" className="username" value={this.state.username} onChange={this.whenChanged}/>
//                 <input type="text" name="password" className="password" value={this.state.password} onChange={this.whenChanged}/>
//                 <button type="submit">Klik</button>
//             </form>
//         );
//     }
// }
