import React, {Component} from 'react'
import {singleEvent, remove} from './apiEvent'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'

class SingleEvent extends Component {
    state = {
        event: '',
        redirectToHome: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        const eventId = this.props.match.params.eventId
        singleEvent(eventId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({event: data})
            }
        }) 
    }

    deleteEvent = () => {
        const eventId = this.props.match.params.eventId
        const token = isAuthenticated().token
        remove(eventId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToHome: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete event?')
        if(answer) {
            this.deleteEvent()
        }
    }

    renderEvent = (event) => {
        const posterId = event.postedBy
        ? `/user/${event.postedBy._id}`
        : "";
        
        const posterName = event.postedBy
        ? event.postedBy.name
        : " Unknown";

        const photoUrl = event._id
        ? `${process.env.REACT_APP_API_URL}/event/photo/${
            event._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  >
                    <p className="font-italic mark">
                        Event Posted on{" "}
                        {/* <Link to={`${posterId}`}> */}
                        {/* <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' /> */}

                            {" "}
                        {/* </Link> */}
                        {new Date(event.created).toDateString()}
                    </p>
                    <div className='container' >
                        <p className="card-text">
                            Name of event: {event.title}
                        </p>
                        <p className="card-text">
                            Date: {event.date}
                        </p>
                        <p className="card-text">
                            Time: {event.time}
                        </p>
                        <p className="card-text">
                            Location: {event.where}
                        </p>
                        <p className="card-text ">
                            Description: {event.body}
                        </p>
                    </div>
                   <div >
                    <img 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover'}} />
                   </div>

                    <div className='d-inline-block mb-5'>
                        <Link
                            to={`/events`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            Back to events
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
                            <div className='mt-5'>
                                <div >
                                    <Link
                                        to={`/edit/event/${event._id}`}
                                        className='btn btn-raised btn-warning'
                                    >
                                        Update Event
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-5'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {event, redirectToHome, redirectToSignIn} = this.state
        
        if(redirectToHome) {
            return <Redirect to={`/`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                           <div className='container'>
                                {!event ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Loading....</h2>
                                        </div>
                                        ) : (
                                            this.renderEvent(event)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SingleEvent