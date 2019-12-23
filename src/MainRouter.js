import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './core/Home'
import Menu from './core/Menu'
import Header from './core/Header'
import TopHeader from './core/TopHeader'

import Signup from './user/SignUp'
import Signin from './user/SignIn'

import NewCarousel from './carousel/NewCarousel'
import EditCarousel from './carousel/EditCarousel'
import Carol from './carousel/Carousel'

import NewEvent from './events/NewEvents'
import Event from './events/Events'
import EditEvent from './events/EditEvent'
import SingleEvent from './events/SingleEvent'

import NewFaculty from './Faculty/NewFaculty'
import Faculty from './Faculty/Faculty'
import SingleFaculty from './Faculty/SingleFaculty'
import EditFaculty from './Faculty/EditFaculty'

import NewStudent from './student/NewStudent'
import Admission from './student/Admission'


import Bully from './student/Bully'
import Student from './student/Student'
import GenderPolicy from './student/GenderPolicy'
import NewLinks from './student/NewLinks'
import SingleLink from './student/SingleLink'

import NewPhoto from './gallery/NewPhoto'
import Photo from './gallery/Photo'
import SinglePhoto from './gallery/SinglePhoto'
import EditPhoto from './gallery/EditPhoto'

import Translate from './Translate'

const MainRouter = () => (
    <div >
        <TopHeader/>
        <Menu />
        <Switch>
            <Route exact path="/" component={Carol}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>

            <Route exact path="/new/carousel" component={NewCarousel}></Route>
            <Route exact path="/edit/carousel/:carouselId" component={EditCarousel}></Route>
            
            <Route exact path="/events" component={Event}></Route>
            <Route exact path="/new/event" component={NewEvent}></Route>
            <Route exact path="/edit/event/:eventId" component={EditEvent}></Route>
            <Route exact path="/event/:eventId" component={SingleEvent}></Route>

            <Route exact path="/new/faculty" component={NewFaculty}></Route>
            <Route exact path="/faculty" component={Faculty}></Route>
            <Route exact path="/faculty/:facultyId" component={SingleFaculty}></Route>
            <Route exact path="/edit/faculty/:facultyId" component={EditFaculty}></Route>
            
            <Route exact path="/new/student" component={NewStudent}></Route>
            <Route exact path="/admission" component={Admission}></Route>


            <Route exact path="/bully" component={Bully}></Route>
            <Route exact path="/student" component={Student}></Route>
            <Route exact path="/genderpolicy" component={GenderPolicy}></Route>
            <Route exact path="/newlink" component={NewLinks}></Route>
            <Route exact path="/link/:linkId" component={SingleLink}></Route>

            <Route exact path="/new/image" component={NewPhoto}></Route>
            <Route exact path="/images" component={Photo}></Route>
            <Route exact path="/image/:imageId" component={SinglePhoto}></Route>
            <Route exact path="/edit/image/:imageId" component={EditPhoto}></Route>

            <Route exact path="/translate" component={Translate}></Route>

        </Switch>
        
    </div>
)

export default MainRouter;