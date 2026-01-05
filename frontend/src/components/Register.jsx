import { useForm } from 'react-hook-form'
import api from '../axios/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {


    const navigate = useNavigate();

    // register user using backend api 
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const onSubmit = async (data) => {
        try {

            const response = await api.post("/auth/register", data);
            console.log(response.data);
            alert("User registered successfully");
            navigate("/login");
            
        }
        catch (error) {
            const message = error.response?.data?.message;
            if (message) {

                if (message.includes("Username")) {
                    setError("username", {
                        type: "server",
                        message: message
                    })
                } else if (message.includes("Email")) {
                    setError("email", {
                        type: "server",
                        message: message
                    })
                } else {
                    setError(message);
                }

            } else {
                setError("server", {
                    type: "server",
                    message: "Something went wrong"
                })
            }
        }
    }


    return (
        <div className=" bg-amber-50 py-10">

            <div className=" h-[calc(100vh-12rem)] items-center justify-center flex mx-auto">
                <div className=" bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className=" text-2xl font-bold text-gray-500 mb-4">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" mb-4">
                            <label className=" block text-gray-500 font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className=" appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                {...register('username', { required: true })}
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                            />
                            {errors.username && <p className=' text-sm text-red-500'>{errors.username.message || "Username is required"}</p>}
                        </div>

                        <div className=" mb-4">
                            <label className=" block text-gray-500 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className=" appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                {...register('email', { required: true })}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className=' text-sm text-red-500'>{errors.email.message || "Email is required"}</p>}

                        </div>
                        <div className=" mb-6">
                            <label className=" block text-gray-500 font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className=" appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                                {...register('password', { required: true })}
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className=' text-sm text-red-500'>Password is required</p>}
                        </div>
                        <div className=" flex items-center justify-between">
                            <button

                                className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                                type="submit"
                            >
                                Sign Up
                            </button>
                            <a

                                className=" inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
                                href="/login"
                            >
                                Already have account?
                            </a>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Register
