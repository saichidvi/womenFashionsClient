import Header from "../components/Header";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const apiUrl =
          "https://women-fashions-server2.vercel.app/api/material/allMaterials";
        const response = await axios.get(apiUrl);
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        toast.error("Oops! Something went wrong.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
      }
    };
    getDetails();
  }, []);
  return (
    <>
      <Header></Header>
      {loading ? (
        <div className="flex">
          <h1 className="text-xl sm:text-2xl text-slate-500 items-center mx-auto mt-10 sm:mt-20">
            Loading please wait
          </h1>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="font-bold text-slate-500 mx-auto mt-10 text-2xl sm:text-3xl">
            Select your styles
          </h1>
          <div className="grid  grid-cols-2   md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 ml-10 mr-10">
            {items.map((item) => {
              return (
                <Card
                  key={item._id}
                  itemId={item._id}
                  price={item.price}
                  name={item.name}
                  picLink={item.picLink}
                ></Card>
              );
            })}
          </div>
        </div>
      )}
      {/* <div className="flex flex-col">
        <h1 className="font-bold text-slate-500 mx-auto mt-10 text-2xl sm:text-3xl">
          Select your styles
        </h1>
        <div className="grid  grid-cols-2   md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 ml-10 mr-10">
          {items.map((item) => {
            return (
              <Card
                key={item._id}
                itemId={item._id}
                price={item.price}
                name={item.name}
                picLink={item.picLink}
              ></Card>
            );
          })}
        </div>
      </div> */}
    </>
  );
};

export default Home;
