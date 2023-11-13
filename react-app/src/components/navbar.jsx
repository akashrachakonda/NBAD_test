
import React, { useEffect, useState } from "react";
import "./navbar.css"
import axios  from "axios";

const NavBar = () =>{
    const [names,setNames]=useState([]);
    const [cost,setCost]=useState();
    const add=(value)=>{
        console.log("Value",value)
        setNames([...names,value])
        console.log("names",names)
    }

    useEffect(()=>{
        axios.get("http://localhost:3001/cost").then((res)=>{
            console.log("res",res);
            setCost(res.data.cost)
        }).catch(error => {
            // Handle the error
            console.error('AxiosError:', error);
          });
    },[cost,names])
  

    return(
        <>
            <div className="navbar">
            <div> Veggies</div>
            {/* <img src="/github.png"/> */}
            </div>
            <div className="container">
               <p> <a href="#" onClick={()=>add("Tomatos")}>Tomatos</a></p>
               <p> <a href="#" onClick={()=>add("Potatos")}>Potatos</a></p>
               <p><a href="#" onClick={()=>add("Carrots")}>Carrots</a></p>
              <p> <a href="#" onClick={()=>add("Apple")}>Apple</a></p> 
        
            </div>
            <div className="container">
              <div> Cost :- {cost}</div>
               {names.map((item,index)=>(
                <div key={index}>{item}</div>
               ))}
        
            </div>
           
        </>
    );
}

export default NavBar;
