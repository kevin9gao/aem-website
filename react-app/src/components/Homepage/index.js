import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import "./Home.css";

function HomePage() {
    // const dispatch = useDispatch();
    useEffect(() => {
        const title = document.getElementsByClassName('split');
        for (let i = 0; i < title.length; i++) {
            const letter = title[i]
            console.log('letter', letter)
            letter.classList.add('animate');
        }
    }, []);

    return (
        <div className="home container">
            <div className="top-banner">
                <div className="banner grid">
                    <h1 className="banner title">
                        <div className="split-title">
                            <div id="split-box">
                                <div className="split">A</div>
                                <div className="split">E</div>
                                <div className="split">M</div>
                                <div className="split">B</div>
                                <div className="split">I</div>
                                <div className="split">O</div>
                                <div className="split">U</div>
                                <div className="split">S</div>
                                <div className="split">A</div>
                            </div>
                        </div>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
