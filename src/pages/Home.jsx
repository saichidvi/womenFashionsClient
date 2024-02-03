import Header from "../components/Header";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const apiUrl = "http://localhost:3000/api/material/allMaterials";
        const response = await axios.get(apiUrl);
        setItems(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getDetails();
  }, []);
  return (
    <>
      <Header></Header>
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
    </>
  );
};

export default Home;
