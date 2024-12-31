import React, { useEffect, useState } from 'react'
import SlideBar from '../component/SlideBar'
import '../assets/css/dashboard.css'
import { loadStudents } from '../common/Common'

function DashBoard() {

    const [students, setStudents] = useState([]);

      useEffect(() => {
          loadStudents()
              .then(data => {
                  setStudents(data);
              })
              .catch(err => {
                  console.log(err);
              });
      }, []);
    const tableBody = () => {
        let body = [];
        students.forEach((data, index) => {
            body.push(
                <tr key={"Student" + index}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.dob}</td>
                    <td>{data.gpa}</td>
                    <td>{data.gender}</td>
                    <td>{data.email}</td>
                </tr>
            );
        });
        return body;
    };

    return (
        <div className='dashboard-main-container'>
            <div className='dashboard-main-wrapper'>
                <div className='dashboard-left'>
                    <SlideBar />
                </div>
                <div className='dashboard-right'>
                    <div>
                        <h1>DashBoard</h1>
                    </div>
                    {/* <div className='dashboard-right-summary'>
                        <div>Total count</div>
                        <div>Male count</div>
                        <div>Female count</div>
                    </div> */}
                    <div className='adminstudent-right-sub-topic'>
                        <div> <h2>Student List</h2></div>
                    </div>
                    <div className='adminstudent-table-main'>
                        <table className='adminstudent-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>GPA</th>
                                    <th>Gender</th>
                                    <th>Email</th>

                                </tr>
                            </thead>
                            <tbody>
                                {tableBody()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
