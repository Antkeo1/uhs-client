import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiStudent";
import { Redirect } from "react-router-dom";

class NewStudent extends Component {
    constructor() {
        super();
        this.state = {
            parent: "",
            student: "",
            birthday: "",
            contact: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.studentData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { parent, student, birthday, contact, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (parent.length === 0 || student.length === 0 || birthday.length === 0 || contact.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.studentData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.studentData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        parent: "",
                        student: "",
                        birthday: "",
                        contact: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

    newStudentForm = (parent, student, birthday, contact) => (
        <form>
            {/* <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div> */}
            <div className="form-group">
                <label className="text-muted">Parent name</label>
                <input
                    onChange={this.handleChange("parent")}
                    type="text"
                    className="form-control"
                    value={parent}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Student Name</label>
                <input
                    onChange={this.handleChange("student")}
                    type="text"
                    className="form-control"
                    value={student}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Student Birthday</label>
                <input
                    onChange={this.handleChange("birthday")}
                    type="text"
                    className="form-control"
                    value={birthday}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Contact</label>
                <input
                    onChange={this.handleChange("contact")}
                    type="text"
                    className="form-control"
                    value={contact}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Send
            </button>
        </form>
    );

    render() {
        const {
            parent,
            student,
            birthday,
            contact,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={'/'} />;
        }

        return (
            <div className='container' >
                
                            <h2 className="mt-5 mb-5">Register Student</h2>
                            <div
                                className="alert alert-danger"
                                style={{ display: error ? "" : "none" }}
                            >
                                {error}
                            </div>

                            {loading ? (
                                <div className="jumbotron text-center">
                                    <h2>Loading...</h2>
                                </div>
                            ) : (
                                ""
                            )} 

                            {
                                isAuthenticated() && isAuthenticated().user ? (this.newStudentForm(parent, student, birthday, contact)) : (<div>
                                    <p>In order to register your child, please create a user account by signing up and signing in. Once you are signed in, revisit this page. </p>
                                </div>)
                            }

                            {/* {this.newStudentForm(parent, student, birthday, contact)} */}
               
            </div>
        );
    }
}

export default NewStudent;