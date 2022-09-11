import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { getUserProfile } from "./api";
import {
    Route, BrowserRouter, Routes, useNavigate
} from 'react-router-dom'
import "./style.css";




//for below will automatically look for index.js since working with javascript
import {
    Navbar,
    Posts,
    Profile,
    Home,
    Register,
    Login,
    CreateNewPost,
    SinglePostView,
    Message,
    EditPost,
    
  } from './Components';
  import {
    getPosts,
  } from './api';

/*
Components needed for this project:
Login
Registration
Posts
AddPost
Profile
Navbar

*/

const App = () => {
    const [ posts, setPosts ] = useState([]);
    const [ token, setToken ] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userProfile, setUserProfile] = useState({})
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem('token');
        setToken('') 
        setUserProfile({});
    }

    const fetchPosts = async() => {
        const results = await getPosts(token)
        setPosts(results.data.posts)
    }
    const getProfile = async() => {
        const storedToken = window.localStorage.getItem('token')

        if (!token) {
            if (storedToken) {
            setToken(storedToken);
            }
            return
        }
        const myProfile = await getUserProfile(token)
        if (myProfile.success) {
            setUserProfile(myProfile.data);
        } else {
            console.log(myProfile.error.message);
        }
    }
   

    useEffect (() => {
        fetchPosts()
    },[token])

    useEffect ( () => {
        getProfile();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token}/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/posts' element={<Posts posts={posts} token={token} />} />
                <Route path='/profile' element={<Profile userProfile={userProfile} posts={posts}/>} />
                <Route path='/register' element={<Register 
                    open={open} 
                    setOpen={setOpen} 
                    setUserProfile={setUserProfile} 
                    setToken={setToken} 
                    setUsername={setUsername} 
                    username={username} 
                    setPassword={setPassword} 
                    password={password} 
                    navigate={navigate}/>} 
                />
                <Route path='/login' element={<Login 
                    open={open} 
                    setOpen={setOpen} 
                    setUserProfile={setUserProfile} 
                    setToken={setToken} 
                    setUsername={setUsername} 
                    username={username} 
                    setPassword={setPassword} 
                    password={password} 
                    navigate={navigate}/>} 
                />
                <Route path='/createNewPost' 
                element={<CreateNewPost 
                token={token} navigate={navigate} 
                open={open} setOpen={setOpen}
                fetchPosts={fetchPosts}/>} />
                <Route path ='/posts/:postID' element={<SinglePostView posts={posts} />} />
                <Route path ='/posts/message/:postID' element={<Message 
                posts={posts} 
                token={token} 
                open={open} 
                setOpen={setOpen}
                navigate={navigate}
                setUserProfile={setUserProfile} />} />
                <Route path ='/posts/edit-post/:postID' element={<EditPost posts={posts} token={token} navigate={navigate} fetchPosts={fetchPosts}/>} />
            </Routes>
            
        </div>
    )
}



//new way to render when react is 18 or later
const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
            <App />
    </BrowserRouter>);

