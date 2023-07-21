import React, { createContext, useContext } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TypeContext } from "../Context/Context";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var password,name,checkPassword,id,phrase="Entering the shadows with lethal grace";
  const { setUserType } = useContext(TypeContext); // Remove userType from here
  const {  setHitman } = useContext(TypeContext)
  const { setAdmin } = useContext(TypeContext)
const [Category,setCategory]= useState("Users")

  const submitData = (data) => {
    name=data.name;
    password = data.password;
    fetchData(Category);
        if(Category==="Admin"){
          phrase="Administrator privileges activated!"
        }
  };
  const fetchData = (Category) => {
    fetch(`http://localhost:4000/${Category}`)
      .then((response) => response.json())
      .then((data) => {
        const foundUser = data.find((user) => user.name === name && user.password === password);

        if (foundUser) {
          axios
            .get(`http://localhost:4000/${Category}?name=${name}`)
            .then((data) => {
              name=data.data[0].name;
              setAdmin(data.data[0].name)
              checkPassword = data.data[0].password;
              setUserType(data.data[0].userType);
              id=data.data[0];
            })
            .then(() => {
              if(Category==="User")
              alert(`Access granted ${phrase}`)
              else alert(`${phrase}`)
              setHitman(name)
            })
            .catch((err) => {
              console.log(err);
            });
        } else alert("Authentication forbidden,password incorrect ")
      });
  };
  useEffect(()=>{
    console.log(Category)
    
  })

  return (
    <div>

      <TypeContext.Provider value={{ setUserType }}>
        <div className="pb-3 mx-auto shadow col-lg-4 m-3">
          <h3 className="p-3 ">Login {Category}</h3>
          <Form className="m-3" id="myform" onSubmit={handleSubmit(submitData)}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  {...register("name", { required: true, maxLength: 16 })}
                />
                {errors.name && (
                  <span className="text-danger">Name is required</span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </Col>
            </Form.Group>



            <Button variant="info" className="text-white m-3" type="submit">
              Submit
            </Button>
          </Form>
          <>
          {Category==="Users"?(
          <p>Click here to login as <button className="text-primary border-0 bg-white" onClick={(e)=>setCategory("Admin")}>Agency Admin</button> </p>
          ):(
            <p>Click here to login as <button className="text-primary border-0 bg-white" onClick={(e)=>setCategory("Users")}>Agency User</button> </p>
          )}
          </>
        </div>
      </TypeContext.Provider>

    </div>
  );
};

export default Login;
