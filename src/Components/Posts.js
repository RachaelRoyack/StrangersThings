import React, { useState} from "react";
import {Link }from 'react-router-dom';
import './Posts.css'
import { deletePost } from "../api";

const Posts = (props) => {
    const {posts, token} = props
    // const [searchTerm, setSearchTerm] = useState('')

    // const searchPost = (term) => {
    //     posts.map((post) => {
    //         const {description, location, price, title, _id} = post;
    //         if (description.includes(term) || title.includes(term)) {
    //             return <div key={_id} className='Post'>
    //                 <h3>{title}</h3>
    //                 <p>{description}</p>
    //                 <p><strong>Price:</strong> {price}</p>
    //                 <p><strong>Location:</strong> {location}</p>

    //                </div>
    //         }
    //     })
    // }

    // const postsToShow = () => {
    //     if (searchTerm !==)
    // }

        // if (searchTerm !== '') {
        //     return (
        //         <div className="postAndSearch">
        //             <h1 className='postHeader'>POSTS</h1>
        //             <form onSubmit = {(event)=> {
        //                 event.preventDefault();
        //                 searchPost(searchTerm)
                        
        //                 }
        //                 }>
        //                 <input className='postSearchBar'
        //                 type='text'
        //                 placeholder="search"
        //                 onChange = {(event) => setSearchTerm(event.target.value)}
        //                 ></input>
        //                 <button type='submit'>Search</button>
        //             </form>
        //         </div> 
        //     )
        // } else if (searchTerm === '') {
            return (
                <div className='postMain'>
                    <div className="postAndSearch">
                        <h1 className='postHeader'>POSTS</h1>
                        <form onSubmit = {(event)=> {
                            event.preventDefault();
                            searchPost(searchTerm)
                            
                            }
                            }>
                            <input className='postSearchBar'
                            type='text'
                            placeholder="search"
                            onChange = {(event) => setSearchTerm(event.target.value)}
                            ></input>
                            <button type='submit'>Search</button>
                            <button className="createPostButton">
                                <Link to='/createNewPost'>Add New Post</Link>
                            </button>
                        </form>
                    </div>
                
            {posts.map(post => {
                    const {description, location, price, title, _id, willDeliver, isAuthor} = post;
                    return <div key={_id} className='Post'>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p><strong>Price:</strong> {price}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Delivery: </strong>{willDeliver ? 'Available' : "unavailable"}</p>
                            {
                                isAuthor ? (
                                    <>
                                        <button>
                                            <Link to={`/posts/edit-post/${_id}`}>Edit</Link>
                                        </button>
                                        <button onClick={(event) => {event.preventDefault(); deletePost(_id,token)}
                                    }>Delete</button>
                                    </>
                                ) : (
                                    <>
                                        <button>
                                            <Link to={`/posts/${_id}`}>View</Link>
                                        </button>
                                        <button><Link to={`/posts/message/${_id}`}>Send Message</Link></button>
                                    </>
                                )
                            }
                        </div>}
                )}
             </div>
            )
        }



export default Posts;