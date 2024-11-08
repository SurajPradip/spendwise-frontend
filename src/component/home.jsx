import React from "react";
import '../index.css'; 
import api from './api.jsx'
import ExpenseListing from './expenselisting.jsx'

import { useState, useEffect } from 'react';

const ExpenseForm = () => {
    const [currentDate, setCurrentDate] = useState('');
    const[response,setResponse] = useState('')
    const[data,setData] = useState('')

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setCurrentDate(`${yyyy}-${mm}-${dd}`);
        const india = new Date(today.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));

        setData({
            ...data,
            'date':india.toISOString()
        })

    }, []);

    const handleChange =(e) =>{
        console.log(data)
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleChangeCategory = (e)=>{
        setData({
            ...data,
            [e.target.name]:Number(e.target.value)
        })
    }
    
    const handleDate=(e)=>{
        setCurrentDate(e.target.value)
        const date = new Date(e.target.value)
        setData({
            ...data,
            [e.target.name]:date.toISOString()
        })
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try{
            const res = await api.post('/django/create-or-list-spending-obj/',data);
            setResponse(res.data)
        }catch (err){
            console.log(err)
        }
    };

    return (
        <form className="w-full h-full flex items-center justify-between p-4 space-x-4 bg-white rounded-b-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="date">
                    Date
                </label>
                <input
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                    type="date"
                    id="date"
                    name="date"
                    value={currentDate}
                    onChange={(e) => handleDate(e)}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="reason">
                    Reason
                </label>
                <input
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                    type="text"
                    id="reason"
                    name="reason"
                    placeholder="Enter reason"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="category">
                    Category
                </label>
                <select
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                    id="category"
                    onChange={(e) => handleChangeCategory(e)}
                    name="category"
                >
                    <option value="">Select category</option>
                    <option value={1}>Food</option>
                    <option value={2}>Transportation</option>
                    <option value={3}>Entertainment</option>
                    <option value={4}>Health</option>
                    <option value={5}>Other</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="price">
                    Price
                </label>
                <input
                    className="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 ease-in-out"
                    type="number"
                    id="price"
                    name="price"
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter price"
                />
            </div>
            <button
                className="bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};



const Home = () => {
    // if (loading) {
    //     return <div>Loading...</div>;
    //   }

    return (
        <div className="flex w-full h-full">
            <div className="hidden md:flex md:w-3/4 bg-indigo-100 flex-col items-center justify-start shadow-2xl">
                <label className="bg-blue-100 md:w-full text-center rounded-t-lg">Expenses</label>
                <div className="bg-gray-300 h-1/12 md:w-full rounded-3xl flex items-center justify-center">
                    <ExpenseForm />
                </div>
                <div className="scrollable-container w-full relative">
                    <ExpenseListing />
                </div>
            </div>
            <div className="flex flex-col w-full md:w-1/4 items-center justify-center p-1">
                <div className="flex-1 w-full bg-red-100 flex items-center justify-center shadow-xl mb-1">
                </div>
                <div className="flex-1 w-full bg-blue-100 flex items-center justify-center shadow-xl mb-1">
                </div>
            </div>
        </div>
    );
};

export default Home;

