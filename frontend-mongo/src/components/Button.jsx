import { Link } from "react-router-dom";

const Button = ({ label, iconURL }) => {
  return (
    <Link to="/login"><button className="mt-10 flex justify-center
    leading-none font-montserrat px-5 py-3
    rounded-full text-white bg-coral-red
    border-coral-red">
        {label}
        <img src={iconURL}
        alt="arrow-right-icon"
        className="ml-2 rounded-full w-5 h-5" 
        />
    </button>
    </Link>
  )
}

export default Button;