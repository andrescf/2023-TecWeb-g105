import React from "react";
import './create.css'

function CreateUser() {
    return (
    <main className="content">
        <div className="bg-container"></div>
        <div className="createuserform">
            <form className="create_user-form">
            <h1 className="create_user-title"> Create User </h1>
                <div className="inputContainer">
                    <input type="text" className="create_user-input" placeholder="a"/>
                    <label for="" className="create_user-label">Email</label>
                </div>

                <div className="inputContainer">
                    <input type="text" className="create_user-input" placeholder="a"/>
                    <label for="" className="create_user-label">Username</label>
                </div>

                <div className="inputContainer">
                    <input type="text" className="create_user-input" placeholder="a"/>
                    <label for="" className="create_user-label">Password</label>
                </div>

                <div className="inputContainer">
                    <input type="text" className="create_user-input" placeholder="a"/>
                    <label for="" className="create_user-label">Confirm Password</label>
                </div>

                <input type="submit" className="submitBtn" value="Sign up"/>
            </form>
        </div>
    </main>
    )
}

export default CreateUser