import React from "react";
import {useParams} from 'react-router-dom';


const SinglePostView = ({posts}) => {
    const { postID } = useParams();

    const [currentPost] =  posts.filter(post => post._id === postID ); //this returns array of 1 item
    const {title, description, location, price, willDeliver} = currentPost;

    return (
            <div className='Post'>
                <h3>{title}</h3>
                <p><strong>Description: </strong>{description}</p>
                <p><strong>Price:</strong> {price}</p>
                <p><strong>Location:</strong> {location}</p>
                {willDeliver ? (<p>Delivery: Yes</p>) : <p>Delivery: No</p>}
            </div>

    )
}

export default SinglePostView;