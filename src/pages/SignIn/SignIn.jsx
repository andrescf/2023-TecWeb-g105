import React from "react";
import './sign.css'

function SignIn() {
    return (
        <main className="content">
        <div className="bg-container"></div>
        <div className="createuserform">
            <form className="signin-form">
            <h1 className="signin-title"> Sign In </h1>
                <div className="inputContainer">
                    <input type="text" className="signin-input" placeholder="a"/>
                    <label for="" className="signin-label">Email</label>
                </div>

                <div className="inputContainer">
                    <input type="text" className="signin-input" placeholder="a"/>
                    <label for="" className="signin-label">Password</label>
                </div>

                <input type="submit" className="submitBtn" value="Sign In"/>
            </form>
        </div>
    </main>
    )
}

export default SignIn