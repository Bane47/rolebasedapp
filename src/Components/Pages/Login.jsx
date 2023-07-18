import React, { createContext, useContext } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TypeContext } from "../Context/Context";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [name, setName] = useState("");
  var password;
  // const [password, setPassword] = useState('')
  const { setUserType } = useContext(TypeContext); // Remove userType from here
  const { setAdmin } = useContext(TypeContext)
  const [id, setId] = useState("");
  // const [checkPassword,setCheckPassword] = useState('')
  var checkPassword;

  const submitData = (data) => {
    setName(data.name);
    password = data.password;
    fetchData();
  };
  console.log(name);

  const fetchData = () => {
    fetch("http://localhost:4000/Accounts")
      .then((response) => response.json())
      .then((data) => {
        const foundUser = data.find(
          (user) => user.name === name && user.password === password
        );

        if (foundUser) {
          axios
            .get(`http://localhost:4000/Accounts?name_like=${name}`)
            .then((data) => {
              setName(data.data[0].name);
              checkPassword = data.data[0].password;
              setUserType(data.data[0].userType);
              console.log("Hello" + data.data[0].userType);
              setId(data.data[0]);
            })
            .then(() => {
              alert(`Welcome back ${name}`)
              setAdmin(name)
            })
            .catch((err) => {
              console.log(err);
            });
        } else alert("Password is incorrect ")
      });
  };

  return (
    <div>
      <TypeContext.Provider value={{ setUserType }}>
        <div className="pb-3 mx-auto shadow col-lg-4 m-3">
          <h3 className="p-3 ">Login</h3>
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
        </div>
      </TypeContext.Provider>
    </div>
  );
};

export default Login;
