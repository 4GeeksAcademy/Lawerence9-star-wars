import React from "react";
import { Link } from "react-router-dom";

export const CharacterDetails = () => {


    return (
        <div className="container">
            <div className="row align-items-start">
                <h3>Name</h3>
                <div className="col-md-4">
                    <img src="https://starwars-visualguide.com/assets/img/big-placeholder.jpg" alt="" className="img-fluid" />
                </div>
                <div className="col">
                    <p>text</p>
                    <p>ss</p>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to={'/characters'}>
                        <span className="btn btn-secondary">Return</span>
                    </Link>
                </div>
            </div>
        </div>

    )
}