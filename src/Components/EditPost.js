import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { updatePost } from "../api";
import './EditPost.css'

const EditPost = ({posts, token, navigate, fetchPosts}) => {

    if (posts.length) {
    const { postID } = useParams();

    const [currentPost] =  posts.filter(post => post._id === postID ); //this returns array of 1 item
    const {title, description, location, price, willDeliver, _id} = currentPost;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newLocation, setNewLocation] = useState(location);
    const [newPrice, setNewPrice] = useState(price);
    const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

    const editPost = async() => {
        const results = await updatePost(token, newTitle,newDescription, newPrice, newLocation, newWillDeliver, _id)
        fetchPosts();
        navigate('/posts') 
    }

    return (<div className='EditPostContainer' >
            <form className='EditPostForm' onSubmit={(event) => {
                event.preventDefault();
                editPost()
            }}>
                <input
                type='text'
                placeholder={title}
                onChange={(event)=> {setNewTitle(event.target.value)}}
                />
                <input
                type='text'
                placeholder={description}
                onChange={(event)=> {setNewDescription(event.target.value)}}
                />
                <input
                type='text'
                placeholder={price}
                onChange={(event)=> {setNewPrice(event.target.value)}}
                />
                <input
                type='text'
                placeholder={location}
                onChange={(event)=> {setNewLocation(event.target.value)}}
                />
                <div className='deliveryEdit'>
                    <h3>Will you deliver?</h3>
                    <input
                    type='checkbox'
                    placeholder={newWillDeliver}
                    onChange={(event)=> {setNewWillDeliver(event.target.checked)}}
                    />
                </div>
            <button type='submit'>Update Post</button>
            </form>
        </div>
        ) } else {
            return <h1>Loading Edit Post Form...</h1>
        }
}

export default EditPost;
