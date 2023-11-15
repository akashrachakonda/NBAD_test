import React, { useEffect, useState } from "react";
import "./navbar.css";
import axios from "axios";
import { GrGithub } from "react-icons/gr";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const NavBar = () => {
  const [names, setNames] = useState([]);
  const [cost, setCost] = useState();

  const increaseCount = (array, value) => {
    const objectIndex = array.findIndex((obj) => obj.name === value);

    const newArray =
      objectIndex !== -1
        ? [
            ...array.slice(0, objectIndex),
            { ...array[objectIndex], count: array[objectIndex].count + 1 },
            ...array.slice(objectIndex + 1),
          ]
        : [...array, { name: value, count: 1 }];

    return newArray;
  };

  const add = (value) => {
    setNames(increaseCount(names, value));
  };

  const removeitems = (itemName) => {
    const updatedNames = names
      .map((obj, index) => {
        if (obj.name === itemName) {
          return { ...obj, count: obj.count - 1 };
        }
        return obj;
      })
      .filter((obj) => obj.count !== 0);

    setNames(updatedNames);
    return;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/cost")
      .then((res) => {
        setCost(res.data.cost);
      })
      .catch((error) => {
        console.error("AxiosError:", error);
      });
  }, [cost, names]);

  const [groceries, setGroceries] = useState([
    "Tomatos",
    "Potatos",
    "Carrots",
    "Brinjal",
    "Bell Pepper",
    "Cauliflower",
    "Bitter gourd",
    "Broccoli",
    "Mushroom",
  ]);

  return (
    <>
      <div className="navbar">
        <h3 className="navtitle"> Grocery Store</h3>
        <div className="githublogo">
          <a
            href="https://github.com/akashrachakonda/NBAD_test"
            target="_blank"
          >
            <GrGithub />
          </a>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h2 className="containerheading">List of Groceries</h2>
            <div className="container">
              <div className="list-group">
                {groceries.map((item, index) => (
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => add(item)}
                    key={index}
                  >
                    {item}
                    <FaPlusCircle style={{ float: "right" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="containerheading">Cart</h2>
            <div className="container">
              <div className="costValue">
                <span className="badge badge-danger">
                  {" "}
                  Total Cost : {names.length > 0 ? cost : 0}
                </span>
              </div>
              <ul className="list-group">
                {names.map((item, index) => {
                  return item.count > 0 ? (
                    <div className="row" key={index}>
                      <li
                        className="list-group-item"
                        style={{ width: "78%", marginLeft: "10px" }}
                      >
                        {item.name}
                        <FaMinusCircle
                          style={{ float: "right" }}
                          onClick={() => removeitems(item.name)}
                        />
                      </li>
                      <li className="list-group-item badge-item">
                        <span className="badge badge-pill badge-primary">
                          {item.count}
                        </span>
                      </li>
                    </div>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
