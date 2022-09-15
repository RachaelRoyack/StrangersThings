import React from "react";
import './Home.css';
import fleamarket from "../videos/fleamarket.jpeg"

const Home = () => {
    return <div className="homeMain">
            <h1>Welcome To Stranger's Things!</h1>
            <p>...where one person's trash is another's treasure!</p>
            <p><img className="homePageImg" src={fleamarket} alt='flea market pic' /></p>
            </div>
}
export default Home;