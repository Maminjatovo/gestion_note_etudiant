import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';
  
export default function Dashboard(props) {
    const { files } = usePage().props
  
    const { data, setData, errors, post, progress } = useForm({
        title: "",
        file: null,
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        post(route("file.upload.store"));
  
        setData("title", "")
        setData("file", null)
    }
    
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">React JS Image Upload using Vite in Laravel 9 Example - LaravelTuts.com</h2>}
        >
            <Head title="Posts" />
  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.title}
                                        </span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="">File</label>
                                        <input
                                            type="file"
                                            className="w-full px-4 py-2"
                                            label="File"
                                            name="file"
                                            onChange={(e) =>
                                                setData("file", e.target.files[0])
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.file}
                                        </span>
                                    </div>
                                </div>
  
                                {progress && (
                                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" width={progress.percentage}> {progress.percentage}%</div>
                                  </div>
                                )}
  
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
  
                            <br/>
  
                            <h1 className='font-bold text-2xl text-center mb-2'>Uploaded File List:</h1>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">No.</th>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2 w-[200px]">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map(({ id, title, name }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{ id }</td>
                                            <td className="border px-4 py-2">{ title }</td>
                                            <td className="border px-4 py-2">
                                                <img src={name} width="200px" />
                                            </td>
                                        </tr>
                                    ))}
  
                                    {files.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="3"
                                            >
                                                No Image found! Upload Some Image.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
  
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}