import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axios/api';

const EditBooks = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {

                const response = await api.get(`/books/${id}`);
                // populating the fetched book data to the field
                reset(response.data);

            } catch (error) {
                console.error("Error while fetching book", error);
            }
        };
        fetchBook();

    }, [id, reset]);



    const onSubmit = async (data) => {
        try {
            await api.put(`/admin/books/edit/${id}`, data);
            alert("Book Updated successfully");
            navigate("/admin/books");
            
        } catch (error) {

            console.error("Error updating book", error);

        }
    }









    return (
        <div className=" items-center">

            <div className=" bg-white p-6 rounded shadow-md w-full md:w-1/2 lg:w-1/3 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col">

                    <div className=" mb-4">
                        <label htmlFor="title" className="block mb-2">Title</label>
                        <input type="text" {...register("title", { required: true })} placeholder="Title" className=" border-2 border-indigo-300 rounded py-2 px-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                        {errors.title && <span className=" text-red-500">This field is required</span>}
                    </div>

                    <div className=" mb-4">
                        <label htmlFor="author" className="block mb-2">Author</label>
                        <input type="text" {...register("author", { required: true })} placeholder="Author" className=" border-2 border-indigo-300 rounded py-2 px-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                        {errors.author && <span className=" text-red-500">This field is required</span>}
                    </div>

                    <div className=" mb-4">
                        <label htmlFor="genre" className="block mb-2">Genre</label>
                        <input type="text" {...register("genre", { required: true })} placeholder="Genre" className=" border-2 border-indigo-300 rounded py-2 px-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                        {errors.genre && <span className=" text-red-500">This field is required</span>}
                    </div>

                    <div className=" mb-4">
                        <label htmlFor="isbn" className="block mb-2">ISBN</label>
                        <input type="text" {...register("isbn", { required: true })} placeholder="ISBN" className=" border-2 border-indigo-300 rounded py-2 px-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                        {errors.isbn && <span className=" text-red-500">This field is required</span>}
                    </div>

                    <div className=" mb-4">
                        <label htmlFor="totalCopies" className="block mb-2">Total Copies</label>
                        <input type="number" {...register("totalCopies", { required: true })} placeholder="Total Copies" className=" border-2 border-indigo-300 rounded py-2 px-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                        {errors.totalCopies && <span className=" text-red-500">This field is required</span>}
                    </div>

                    <div className=" mb-4">
                        <label htmlFor="description" className="block mb-2">Description</label>
                        <textarea {...register("description", { required: true })} placeholder="Description" className=" border-2 border-indigo-300 rounded py-2 px-2 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"></textarea>
                        {errors.description && <span className=" text-red-500">This field is required</span>}
                    </div>

                    <button type="submit" className=" bg-indigo-400 hover:bg-indigo-500 px-4 py-2 rounded hover:outline-none cursor-pointer hover:outline-offset-2 hover:ring-offset-1 hover:ring-2 hover:ring-indigo-400 transition ease-in-out duration-105 ">
                        Save
                    </button>

                </form>
            </div>


        </div>
    )
}

export default EditBooks
