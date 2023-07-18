import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import axios from 'axios';
import './../CSS files/SignUp.css'


function MyForm() {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [phone, setPhone] = useState('')
    const [nation, setNation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType,setUserType] = useState('')

    const ageCheck=(value)=>{
        if(value>=18){
            return true
        }else return false
    }


    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const submitData = (data) => {
        setName(data.name);
        setAge(data.age);
        setPhone(data.phone);
        setNation(data.nation);
        setEmail(data.email);
        setPassword(data.password);
        setUserType(data.type)
        postData()
    }

    //Posting the form data into the json
    const postData=()=>{
        if(name.length>0){
        axios.post("http://localhost:4000/Accounts",{
            name:name,
            age:age,
            phone:phone,
            nation:nation,
            email:email,
            password:password,
            userType:userType,
            isLogged:false

        }).then(()=>{
            alert("Successfully account added")
        })
        .catch((err)=>{
            console.log("Unsuccessfull")
        })
    }

        
    }


    useEffect(() => {      
console.log("Success")

    },[])
    return (
        <div className='pb-3 mx-auto shadow col-lg-5 m-3 '>
            <h3 className='p-3 '>Register</h3>
            <Form className='m-3' id='myform' onSubmit={handleSubmit(submitData)}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="6">
                        Name
                    </Form.Label>
                    <Col >
                        <Form.Control type='text' name='name' {...register("name", { required: true, maxLength: 16 })} />
                        {errors.name && <span className='text-danger'>Name is required</span>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3"  >
                    <Form.Label column sm="6">
                        Age
                    </Form.Label>
                    <Col >
                        <Form.Control type='number'  {...register('age', { required: 'Age is required',validate:(value)=> ageCheck(value) || "Minimum age is 18" })} />
                       {/* {console.log(errors.age.message)} */}
                        {errors.age && <span className='text-danger'>{errors.age.message}</span>}

                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="6">
                        Phone
                    </Form.Label>
                    <Col >
                        <Form.Control type='text'  {...register('phone', { required: true, minLength: 10, maxLength: 10 })} />
                        {errors.phone && <span className='text-danger'>Phone is required</span>}

                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="6">
                        Nationality
                    </Form.Label>
                    <Col >
                        <Form.Control type='text' {...register('nation', { required: true })} />
                        {errors.nation && <span className='text-danger'>Nationality is required</span>}

                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="6">
                        Email
                    </Form.Label>
                    <Col >
                        <Form.Control type='email' name='email' {...register('email', { required: "Enter the Email ID", validate: (value) => isEmail(value) || "Invalid email address" })} />
                        {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="6">
                        Password
                    </Form.Label>
                    <Col >
                        <Form.Control type="password" placeholder="Password" name='password' {...register('password', {
                            required: "Password is required",
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                                message: "Password must contain atleast one uppercase ,lowercase , number and a special character"
                            }
                        })} />
                        {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="6">
                        Confirm Password
                    </Form.Label>
                    <Col >
                        <Form.Control type="password" placeholder="Confirm Password"  {...register('confirm', { required: "Password is required", validate: (value) => value === watch('password') || "Passwords are not matching" })} />
                        {errors.confirm && <span className='text-danger'>{errors.confirm.message}</span>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >

 <h5>Category : Agent</h5>
                </Form.Group>


                <Button variant="info" className='text-white' type='submit'>Submit</Button>
                <p>Want to be an admin? Click here</p>

            </Form>

        </div>
    );
}

export default MyForm;