import React from "react";
import { Link } from "react-router-dom";

export const Characters = () => {



    const handleImgError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
    }


    return (
        <div>
            <h1 className="text-center">Characters</h1>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="col">
                            <div className="card border-dark rounded text-bg-dark" style={{ width: "100%", height: "100%" }}>
                                <img 
                                    onError={handleImgError} 
                                    src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
                                    className="card-img-top" 
                                    alt="Character" 
                                    style={{ height: "150px", objectFit: "cover" }} 
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title.</p>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <Link to={'/character-details'}>
                                            <span className="btn btn-secondary">Details</span>
                                        </Link>
                                        <span className="border border-warning rounded-circle d-flex align-items-center justify-content-center p-2" style={{ width: "40px", height: "40px" }}>
                                            <i className="fa-regular fa-heart fa-lg text-warning"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}