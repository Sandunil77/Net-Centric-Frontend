import React, { useState, useEffect } from 'react'
import SlideBar from '../component/SlideBar'
import '../assets/css/addstudent.css'
import { Form } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from 'react-router-dom'
import { loadStudent } from '../common/Common'
import { uploadFile } from "../routes/Routes"
import { toast } from "react-toastify"

function AddStudent() {
  const navigate = useNavigate();
  const [studentId] = useState(decodeURI(window.location.href.split('/').at(-1)));
  const [student, setStudent] = useState({
    name: '',
    dob: null,
    gpa: '',
    gender: '',
    email: ''
  });

  console.log(student);

  useEffect(() => {
    if (studentId !== 'add') {
      loadStudent(studentId).then(data => {
        setStudent(data);
        setDob(new Date(data.dob));
      }).catch(() => null);
    }
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setStudent((prevState) => ({
      ...prevState,
      dob: date ? date.toISOString().split('T')[0] : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', e.target.name.value);
    data.append('gender', e.target.gender.value);
    data.append('dob', e.target.dob.value);
    data.append('gpa', e.target.gpa.value);
    data.append('email', e.target.email.value);
    const endpoint = student.id ? ('/api/student/update/' + student.id) : '/api/student';
    uploadFile(data, endpoint).then(response => {
      if (response.status === 200) {
        if (response.data.error) {
          toast.error(response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/adminStudent');
        }
      } else {
        toast.error("An error occurred!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    });
  }



  return (
    <div className='addstudent-main-container'>
      <div className='addstudent-main-wrapper'>
        <div className='addstudent-left'>
          <SlideBar />
        </div>


        <div className='addstudent-right'>
          <div>
            <h1>Add Edit Student</h1>
          </div>
          <div className='addstudent-right-sub-topic'>
            <div> <h2>Student Details</h2></div>
          </div>


          <div>
            <form onSubmit={handleSubmit}>
              <div className='form-main-content'>
                <div className='input-main-container'>
                  
                  <div className='input-sub-container'>
                    <label htmlFor='username'>Student Name:</label>
                    <input id='name' name='name' type='text'
                      onChange={handleChange}
                      placeholder="Enter student name"
                      value={ student?.name || ""}
                    ></input>
                  </div>

                  
                  
                </div> 
                <div className='input-main-container'>
                <div className='input-sub-container'>
                    <label htmlFor='email'>Student Email:</label>
                    <input id='email' name='email' type='email'
                      onChange={handleChange}
                      placeholder="Enter student email"
                      value={student ? student.email : ''}
                    ></input>
                  </div>

                </div>

              
                <div className='input-main-container'>


                  <div className='input-sub-container'>
                    <label htmlFor='birthdate'>Student Birthdate:</label>
                    <input id='dob' name='dob' type='date'
                      onChange={handleChange}
                      value={student?.dob || ''}></input>
                    
                  </div>
                  
                  <div className='input-sub-container'>
                    <label htmlFor='gpa'>Student GPA:</label>
                    <input id='gpa' name='gpa' type='number' step='0.01' value={ student?.gpa || ''}
                      onChange={handleChange}
                      placeholder="Enter GPA (e.g., 3.5)"
                    />
                  </div>

                  

                </div>
                <div className='input-main-container'>

                <div className='input-sub-container'>
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name='gender'
                      value={student?.gender || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  
                  
                  
                  <div></div>
                </div>
              </div>
              <div className='button-main-container'>
                <button type="submit">{student.id? "Edit Student" : "Add Student"}</button>
                <button onClick={() => navigate('/adminStudent')}
                  style={{ backgroundColor: '#f54a4a' }}
                >Cancel</button>
              </div>
            </form>
          </div>


        </div>
      </div>
    </div>
  )
}

export default AddStudent
