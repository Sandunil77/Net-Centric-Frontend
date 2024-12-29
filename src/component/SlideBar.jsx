import React from 'react'
import '../assets/css/component.css'
import { useNavigate } from 'react-router-dom'

function SlideBar() {
    const navigate = useNavigate();
    return (
        <div className='slidebar-main-container'>
            <div className='sliderbar-main-warper'>
                <div className='sub_topic' onClick={() => navigate  ('/')}>DashBoard</div>
                <div className='sub_topic' onClick={() => navigate  ('/adminStudent')}>Manage Student</div>
            </div>
        </div>
    )
}

export default SlideBar
