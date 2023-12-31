import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {


    const [blogs, setBlogs] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        // console.log("data fetch");
        loadData();
    }, [])

    function loadData() {
        // setLoad(true)
        axios.get("https://6588549890fa4d3dabf9c2e2.mockapi.io/blogs")
            .then((res) => {
                setBlogs(res.data)
                setLoad(false)
            })
            .catch((rej) => {
                console.log(rej);
            })
    }



    function handleDelete(e, id) {
        // const data = blogs.filter((blogs) => blogs.id !== id);
        e.preventDefault();
        axios.delete("https://6588549890fa4d3dabf9c2e2.mockapi.io/blogs/" + id)
            .then((res) => {
                console.log(res.data);
                loadData();
            })
        // setBlogs();
    }



    // a useEffect() method run in every render of a component
    // if we provide an dependancies then it can call only when the depencies will change like 
    // if difine dependancies as [name] then whenever the name changes the useeffect will be call
    // in every it call once when the component render
   

    return (
        <>
            {load && <p style={{
                textAlign: "center"
            }}>Loading-Data....</p>}
            {blogs &&
                <div className="content">
                    {
                        blogs.map((blog) => (
                            <div className="container" key={blog.id} style={{
                                margin:"1%",
                                padding:"1%",
                            }}>
                                <div class="card" style={{
                                margin:"1%",
                            }} >
                                    <div class="card-header  bg-success-subtle text-emphasis-success" >
                                        {blog.author}
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{blog.title}</h5>
                                        <p class="card-text">{blog.body}</p>
                                        <Link to={'/create/' + blog.id}> <button className='btn btn-primary'>Edit</button> </Link> 
                                        <button className="btn btn-danger" onClick={(e) => {
                                            handleDelete(e, blog.id)
                                        }}>Delete</button> 
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            }
        </>
    )
}
