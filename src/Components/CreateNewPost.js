import React, {useState} from "react";
import './CreateNewPost.css'
import { createPost } from "../api";  
import { Snackbar } from "@mui/material";

const CreateNewPost = ({token, navigate, open, setOpen, fetchPosts, }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)

    const handleSubmit = async () => {
    const results = await createPost(token, title, description, price, location, willDeliver);
    
        if (results.success) {
            fetchPosts();
            navigate('/posts') 
        } else {
            setOpen(true)
            let form = document.querySelector('form')
            form.reset()
        }
    }

    return (
        <main>
            <h1>Add Post</h1>
            <form className='postSubmitForm' onSubmit = {(event)=> {
            event.preventDefault();
                handleSubmit()
            }
            }>
            <Snackbar 
                open={open}
                anchorOrigin= {{vertical: "top", horizontal: "center"}}
                message='There was an error uploading your post, please try again' 
                autoHideDuration={2000} 
                onClose={() => setOpen(false)}
                >
            </Snackbar>
            <div className="newPostInput">
                    <h3>Title</h3>
                    <input
                    type='text'
                    placeholder="title"
                    onChange ={event => setTitle(event.target.value)} >
                    </input>
                </div>
                <div className="newPostInput">
                    <h3>Description</h3>
                    <input
                    type='text'
                    placeholder="description"
                    onChange ={event => setDescription(event.target.value)} >
                    </input>
                </div>
                <div className="newPostInput">
                    <h3>Price</h3>
                    <input
                    type='text'
                    placeholder="price"
                    onChange ={event => setPrice(event.target.value)} >
                </input>
                </div>
                <div className="newPostInput">
                    <h3>Location</h3>
                    <input
                    type='text'
                    placeholder="location"
                    onChange ={event => setLocation(event.target.value)} >
                </input>
                </div>
                <div className="newPostInput">
                    <h3>Will you deliver?</h3>
                    <input className="checkBox"
                    type='checkbox'
                    onChange ={event => setWillDeliver(true)} >
                    </input>
                </div>
                <div>
                    <button type="submit">Submit Post</button>
                </div>
            </form>
            
        </main>
    )
}

export default CreateNewPost;