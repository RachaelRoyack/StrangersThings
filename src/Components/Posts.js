import React, { useState} from "react";
import {Link }from 'react-router-dom';
import './Posts.css'
import { deletePost } from "../api";

const Posts = (props) => {
    
    const {posts, token} = props
    const [searchTerm, setSearchTerm] = useState('')


    const postMatches = (post, string) => {
        const {description, title} = post;
        
        if (title.toLowerCase().includes(string.toLowerCase()) || description.toLowerCase().includes(string.toLowerCase())) {
            return post
        }
        }

      const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
      const postsToDisplay = searchTerm.length ? filteredPosts : posts


         return (
                <main>
                    <div className="postAndSearch">
                        <h1 className='postHeader'>POSTS</h1>
                        <form onSubmit = {(event)=> {
                            event.preventDefault();    
                            }
                            }>
                            <input className='postSearchBar'
                            type='text'
                            placeholder="search"
                            onChange = {(event) => setSearchTerm(event.target.value)}
                            ></input>
                            <button className="createPostButton">
                                <Link to='/createNewPost'>Add New Post</Link>
                            </button>
                        </form>
                    </div>
                    <div className="postsContainer">
                    {postsToDisplay.map(post => {
                    const {description, location, price, title, _id, willDeliver, isAuthor} = post;
                    return <div key={_id} className='Post'>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p><strong>Price:</strong> {price}</p>
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Delivery: </strong>{willDeliver ? 'Available' : "unavailable"}</p>
                            <p>
                            {
                                isAuthor ? (
                                    <>
                                        <h3>Messages:</h3>
                                        {post.messages.map(message => {
                                            const {content, fromUser, post, _id} = message
                                            return <div key={_id} className="messagesForPost">
                                                        <p><strong>{fromUser.username}: </strong> {content}</p>
                                                    </div>})
                                        }
                
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
                            </p>
                        </div>})}
                        </div>
                
             </main>
         )
        }



export default Posts;
