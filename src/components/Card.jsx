import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Card = ({ itemId, price, name, picLink }) => {
  const onSelectCart = async () => {
    try {
      const apiURL = "http://localhost:3000/api/cart/updateCart";
      const reqBody = {
        cartId: "65bdc0c72b9e5996eb54703f",
        materialId: itemId,
        itemPrice: price,
        operation: "add",
      };
      const res = await axios.put(apiURL, reqBody);
      if (!res.data.success) {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      toast.error("Oops! Something went wrong.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <>
      <div className="max-w-sm rounded cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-100">
        <img className="w-full" src={picLink}></img>
        <div className="px-1 py-1  md:px-6 md:py-4">
          <div className="font-bold text-slate-500 text-xs md:text-xl mb-2">
            {name}
          </div>
          <div className="flex  justify-between">
            {" "}
            <p className="text-gray-700  text-sm md:text-lg">Price: ${price}</p>
            <FontAwesomeIcon
              className=" text-slate-500  md:text-2xl transition-transform duration-500 hover:scale-125"
              icon={faCartShopping}
              onMouseOver={() => console.log("I am here")}
              onClick={onSelectCart}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
