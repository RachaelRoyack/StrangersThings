import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../api";
import { Snackbar } from "@mui/material";

const Message = ({posts, token, open, setOpen}) => {
    const [message, setMessage] = useState('')

    const { postID } = useParams();

    // const [currentPost] =  posts.filter(post => post._id === postID ); //this returns array of 1 item
    // const {title, description, location, price, willDeliver} = currentPost;

    const handleSubmit = async() => {
        const results = await sendMessage(_id, message, token);
        
        if (results.success) {
            setOpen(true)
            navigate('/posts') 
        } 
    }

    return (
        <main>
            {/* <div className='Post'>
                <h3>{title}</h3>
                <p><strong>Description: </strong>{description}</p>
                <p><strong>Price:</strong> {price}</p>
                <p><strong>Location:</strong> {location}</p>
                {willDeliver ? (<p>Delivery: Yes</p>) : <p>Delivery: No</p>}
            </div> */}
            <form onSubmit = {(event)=> {
            event.preventDefault();
                handleSubmit()
            }}>
            <Snackbar 
                open={open}
                anchorOrigin= {{vertical: "top", horizontal: "center"}}
                message='Message Sent' 
                autoHideDuration={2000} 
                onClose={() => setOpen(false)}
                >
            </Snackbar>
            <h3>Message User About This Post</h3>
            <input type='text' placeholder="type message here" onChange={event => setMessage(event.target.value)}></input>
            <button type='submit'>Send</button>
            </form>
        </main>

    )
}

export default Message;
