
import React, { useState } from "react";
import "./navbar.css"
import axios  from "axios";

const NavBar = () =>{
    const [names,setNames]=useState([]);
    const add=(value)=>{
        console.log("Value",value)
        setNames([...names,value])
        console.log("names",names)
    }

    axios.get("http://localhost:3001/cost").then((res)=>{
        console.log("res".res);
    }).catch(error => {
        // Handle the error
        console.error('AxiosError:', error);
      });

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
               {names.map((item,index)=>(
                <div key={index}>{item}</div>
               ))}
        
            </div>
           
        </>
    );
}

export default NavBar;
