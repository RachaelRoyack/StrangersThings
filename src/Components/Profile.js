import React from "react";
import './Profile.css'

const Profile = async ({userProfile}) => {


    return (
        <div>
            <h2>Messages to Me</h2>
            {userProfile.messages.map(message => {
                const {content, fromUser, post, _id} = message
                if (fromUser.username !== userProfile.username) {
                    <div key={_id} className="messagesToMe">
                        <h3>(From: ${fromUser.username})</h3>
                        <p>${content}</p>
                        <p><strong>Post:</strong>${post}</p>
                    </div>
                }
            })}
            <h2>Messages from Me</h2>
            {userProfile.messages.map(message => {
                const {content, fromUser, post, _id} = message
                if (fromUser.username === userProfile.username) {
                    <div key={_id} className="messagesFromMe">
                        <h3>(From: me)</h3>
                        <p>${content}</p>
                        <p><strong>Post:</strong>${post}</p>
                    </div>
                }
            })}
        </div>
    )
}

export default Profile;