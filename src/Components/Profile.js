import React from "react";
import './Profile.css'
import {Link }from 'react-router-dom';

const Profile = ({userProfile, posts,}) => {

if(userProfile.messages) {
    return (
        <div>
            <h2>Messages to Me</h2>
            {userProfile.messages.map(message => {
                const {content, fromUser, post, _id} = message
                if (fromUser._id !== userProfile._id) {
                    return <div key={_id} className="messagesToMe">
                                <h3>(From: {fromUser.username})</h3>
                                <p>{content}</p>
                                <p><strong>Post:</strong><Link to={`/posts/${post._id}`}>{post.title}</Link></p>
                            </div>
                }
            })}
            <h2>Messages from Me</h2>
            {userProfile.messages.map(message => {
               
                const {content, fromUser, post, _id} = message
    
                if (fromUser._id === userProfile._id) {
                    return <div key={_id} className="messagesFromMe">
                                <h3>(From: me)</h3>
                                <p>{content}</p>
                                <p><strong>Message Again:</strong><Link to={`/posts/message/${post._id}`}>{post.title}</Link></p>
                            </div>
                }
            })}
        </div>
    ) } else {
        return <h1>Loading Messages...</h1>
    }
}

export default Profile;