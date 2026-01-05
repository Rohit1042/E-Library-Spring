import React from 'react'

const Features = () => {
    return (
        <div className=' bg-slate-50'>

            <div className=' container mx-auto items-center py-12'>

                <h1 className=' text-center text-2xl font-black text-gray-500 font-serif my-12'>Features</h1>


                <div className=' flex w-full h-full justify-between gap-6 max-md:flex-wrap p-6 '>

                    <div className=' bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition duration-150 ease-in-out'>
                        <h2 className=' text-xl font-bold text-gray-500'>Easy to Navigate</h2>
                        <p className=' text-gray-500'>
                            Effortlessly explore books, stories, and user content with a clean, intuitive interface designed for all ages.
                        </p>
                    </div>
                    <div className=' bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition duration-150 ease-in-out'>
                        <h2 className=' text-xl font-bold text-gray-500'>Create Your Own Story</h2>
                        <p className=' text-gray-500'>Unleash your creativity—write, edit, and publish your own stories directly on the platform.
                        </p>
                    </div>
                    <div className=' bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition duration-150 ease-in-out'>
                        <h2 className=' text-xl font-bold text-gray-500'>Secure & Private</h2>
                        <p className=' text-gray-500'>Your content and data are protected with robust authentication and privacy controls.</p>
                    </div>
                    <div className=' bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition duration-150 ease-in-out'>
                        <h2 className=' text-xl font-bold text-gray-500'>Connect with Others</h2>
                        <p className=' text-gray-500'>Engage in discussions, share insights, and collaborate with fellow readers and writers.</p>
                    </div>
                    
                </div>


            </div>

        </div>
    )
}

export default Features
