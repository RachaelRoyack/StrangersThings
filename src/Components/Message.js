import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { sendMessage, getUserProfile } from "../api";
import { Snackbar } from "@mui/material";
import './Message.css'

const Message = ({posts, token, open, setOpen, navigate, setUserProfile}) => {
    if (posts.length){ 
    const [message, setMessage] = useState('')

    const { postID } = useParams();

    const [currentPost] =  posts.filter(post => post._id === postID ); //this returns array of 1 item
    const {title, description, location, price, willDeliver, _id} = currentPost;

    const handleSubmit = async() => {
        const results = await sendMessage(_id, message, token);
        
        if (results.success) {
            setOpen(true)
            const profileResults = await getUserProfile(token)
            let myProfile = profileResults.data
            setUserProfile(myProfile)
            navigate('/profile') 
        } 
    }

        return(
        <main>
            <div className='postInMessage'>
                <h3>{title}</h3>
                <p><strong>Description: </strong>{description}</p>
                <p><strong>Price:</strong> {price}</p>
                <p><strong>Location:</strong> {location}</p>
                {willDeliver ? (<p>Delivery: Yes</p>) : <p>Delivery: No</p>}
            </div>
            <div className="messageSection">
            <h3>Message User About This Post</h3>
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
                <div className="inputMessage">
                <input type='text' placeholder="type message here" onChange={event => setMessage(event.target.value)}></input>
                <button type='submit'>Send</button>
                </div>
                </form>
            </div>
        </main>

    )
} else {
    return <h3>Loading Message Box...</h3>
}
}

export default Message;

