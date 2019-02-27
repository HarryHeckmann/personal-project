import React from 'react'
import {Link} from 'react-router-dom'

import './Intro.css'

export default function Intro(){
    return(
        <div id='intro_main'>
            <div id='intro_center'>
                <h2>To find the perfect breed for your lifestyle, take this short quiz! If you'd rather just search all breeds, click the link below.</h2>
                <div id='intro_links_div'>
                    <Link className='intro_links' to='/survey/1'>Begin The Quiz</Link>
                    <Link className='intro_links' to='/search'>Search Now</Link>
                </div>
            </div>
            
        </div>
    )
}