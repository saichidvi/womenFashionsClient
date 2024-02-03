import { useEffect, useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [cartId, setCartId] = useState();
  console.log(items);
  useEffect(() => {
    getCart();
  }, []);
  const getCart = async () => {
    try {
      const apiURL = "http://localhost:3000/api/cart/cartDetails";
      const res = await axios.get(apiURL);
      if (!res.data.success) {
        toast.error(res.data.success, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      setCartId(res.data.data.cartId);
      setItems(res.data.data.items);
      setTotalPrice(res.data.data.totalPrice);
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
  const onDelete = async (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const itemPrice = e.currentTarget.getAttribute("itemprice");

    try {
      const reqBody = {
        cartId,
        itemPrice,
        materialId: id,
        operation: "remove",
      };
      const apiURL = "http://localhost:3000/api/cart/updateCart";
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
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      setTotalPrice((totalPrice) => totalPrice - itemPrice);
    } catch (err) {
      console.log(err);
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
      <Header></Header>
      <div className="container text-center mt-10 items-center justify-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-500  mb-4 sm:mb-10">
          Your Cart is ready now !
        </h1>

        <table className="mr-5 sm:mx-20 md:mx-20">
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">
                  <div>
                    <img
                      src={item.picLink}
                      className="w-1/2 md:w-1/3 border rounded-lg mx-auto"
                    ></img>
                  </div>
                </td>
                <td className="sm:px-4 py-2  w-1/3 md:w-1/2">
                  <div>{item.name}</div>
                  <div className="flex mt-2 justify-center items-center gap-2 sm:gap-5">
                    <div>${item.price}</div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="cursor-pointer transition-transform duration-500 hover:scale-125"
                      id={item._id}
                      itemprice={item.price}
                      onClick={(e, item) => {
                        onDelete(e, item);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-slate-500 sm:text-xl sm:mt-20">
          <strong>
            Total Price: <span className="text-black">${totalPrice}</span>
          </strong>
        </div>
      </div>
    </>
  );
};

export default Cart;
