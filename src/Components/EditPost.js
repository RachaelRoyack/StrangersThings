import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { updatePost } from "../api";

const EditPost = ({posts, token, navigate, fetchPosts}) => {
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

    return (
        <form onSubmit={(event) => {
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
            <input
            type='checkbox'
            placeholder={newWillDeliver}
            onChange={(event)=> {setNewWillDeliver(event.target.checked)}}
            />
        <button type='submit'>Update Post</button>
        </form>
        )
}

export default EditPost;



// return (
//         <div className='Post'>
//             <h3>{title}</h3>
//             <p><strong>Description: </strong>{description}</p>
//             <p><strong>Price:</strong> {price}</p>
//             <p><strong>Location:</strong> {location}</p>
//             {willDeliver ? (<p>Delivery: Yes</p>) : <p>Delivery: No</p>}
//         </div>

// )