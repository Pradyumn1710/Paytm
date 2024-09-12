import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/Button';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate()
    const [signin, setSignin] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignin((prevSignin) => ({
            ...prevSignin,
            [name]: value
        }));
    };

    const submit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      try {
          const response = await axios.post('http://localhost:3002/api/v1/user/signin', signin, {
              headers: {
                  'Content-Type': 'application/json' // Ensure this header is set
              }
          });
          localStorage.setItem('token',response.data.token )
          // console.log(response.data);
          navigate('/dashboard');
      } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message);
      }
  };
  

    return (
        <div className="flex justify-around">
            <Card className='h-full w-100px'>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>This is where you signup</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <Label className='flex pb-2 pl-1 text-lg'>Username</Label>
                        <Input
                            placeholder='Username'
                            type='text'
                            name='username'
                            value={signin.username}
                            onChange={handleChange}
                        />
                        <Label className='flex pb-2 pl-1 text-lg mt-2'>Password</Label>
                        <Input
                            placeholder='Password'
                            type='password'
                            name='password'
                            value={signin.password}
                            onChange={handleChange}
                        />
                        <Button type='submit'>Signin</Button>
                         
                    </form>
                </CardContent>
                <CardFooter className="flex gap-3">
                    <Link to="/create-account" className="text-black hover:text-gray-500 hover:underline hover:decoration-solid">Click here</Link>
                    <div>to create a new account</div>
                </CardFooter>
            </Card>
        </div>
    );
}