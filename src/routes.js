import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home'

import Intro from './Components/Survey/Intro/Intro'
import Page1 from './Components/Survey/Page1/Page1'
import Page2 from './Components/Survey/Page2/Page2'
import Page3 from './Components/Survey/Page3/Page3'
import Page4 from './Components/Survey/Page4/Page4'
import Results from './Components/Survey/Results/Results'
import Search from './Components/Search/Search'
import PetProfile from './Components/Search/PetProfile'

export default (
    <Switch>
        <Route path='/petprofile/:id' component={PetProfile}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/search' component={Search}/>
        <Route path='/survey/intro' component={Intro}/>
        <Route path='/survey/1' component={Page1}/>
        <Route path='/survey/2' component={Page2}/>
        <Route path='/survey/3' component={Page3}/>
        <Route path='/survey/4' component={Page4}/>
        <Route path='/survey/results' component={Results}/>
        <Route path='/survey/intro' component={Intro}/>
        <Route exact path='/' component={Home}/>
    </Switch>
)