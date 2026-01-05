import { useForm } from "react-hook-form"
import api from "../axios/api";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {
            const response = await api.post("/auth/login", data);
            alert("User logged in successfully !");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("roles", response.data.roles);
            window.dispatchEvent(new Event("authChange"));
            if (response.data.roles.includes("ROLE_ADMIN")) {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
           
        } catch (error) {
            const errmessage = error.response?.data?.message;
            if (errmessage.includes("Invalid")) {
                alert(errmessage);
            } else {
                alert("login failed. please try again.");
            }
        }
    }


    return (
        <div className=" bg-amber-50 py-10">

            <div className=" h-[calc(100vh-12rem)] items-center justify-center flex mx-auto">
                <div className=" bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className=" text-2xl font-bold text-gray-500 mb-4">Login</h1>
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
                                autoComplete="off"
                            />
                            {errors.username && <p className=" text-red-500 text-xs italic">
                                Username is required
                            </p>}


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
                                autoComplete="off"
                            />
                            {errors.password && <p className=" text-red-500 text-xs italic">
                                Password is required
                            </p>}

                        </div>
                        <div className=" flex items-center justify-between">
                            <button
                                className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                                type="submit"
                            >
                                Sign In
                            </button>
                            <a

                                className=" inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
                                href="/register"
                            >
                                Don't have account?
                            </a>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Login
