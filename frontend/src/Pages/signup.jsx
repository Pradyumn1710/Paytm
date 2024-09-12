/* eslint-disable no-unused-vars */
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/Button'
import { useState } from "react";
import axios from 'axios'
// import { findSourceMap } from "module";

export default function Signup() {
    const navigate = useNavigate()
    const [Signup, setSignup] = useState({
        'username': "",
        'firstname': "",
        'lastname': "",
        'password': ""
    });

    const onTriggred = (e) => {
        const { name, value } = e.target;
        setSignup((prevSignup) => {
            const newSignup = {
                username: prevSignup.username,
                firstname: prevSignup.firstname,
                lastname: prevSignup.lastname,
                password: prevSignup.password
            };
            newSignup[name] = value;
            return newSignup;
        });
    };

    const submit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post('http://localhost:3002/api/v1/user/signup', Signup, {
                headers: {
                    'Content-Type': 'application/json' // Ensure this header is set
                }
            });
            localStorage.setItem('token',response.data.token )
            navigate('/signin');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <div className="flex justify-around">
            <div>
                <Card className='h-full w-80'>
                    <CardHeader>
                        <CardTitle className='text-xl'>SignUp</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Label className='flex pb-1 pl-1 text-lg'>Username</Label>
                        <Input
                            placeholder='Username/Email'
                            name='username' // Use 'username' (same as state key)
                            type='text'
                            value={Signup.username} // Controlled input
                            onChange={onTriggred} // Use onChange, not onClick
                        />
                        <Label className='flex pt-2 pb-1 pl-1 text-lg'>Firstname</Label>
                        <Input
                            placeholder='Firstname'
                            type='text'
                            name='firstname'
                            value={Signup.firstname} // Controlled input
                            onChange={onTriggred}
                        />
                        <Label className='flex pt-2 pb-1 pl-1 text-lg'>Lastname</Label>
                        <Input
                            placeholder='Lastname'
                            type='text'
                            name='lastname'
                            value={Signup.lastname} // Controlled input
                            onChange={onTriggred}
                        />
                        <Label className='flex pt-2 pb-1 pl-1 text-lg'>Password</Label>
                        <Input
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={Signup.password} // Controlled input
                            onChange={onTriggred}
                        />
                        <Button className='mt-5 p-5 rounded-xl' onClick={submit}>
                            Signup
                        </Button>
                    </CardContent>
                    <CardFooter className='flex space-between justify-center'>
                        <p>Already a user?</p>
                        <Link to="/signin" className="text-black hover:text-gray-500 hover:underline hover:decoration-solid">
                            Signin
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
