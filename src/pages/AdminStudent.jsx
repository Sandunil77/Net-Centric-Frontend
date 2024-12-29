import React, { useEffect, useState } from 'react'
import SlideBar from '../component/SlideBar'
import '../assets/css/adminstudent.css'
import { useNavigate } from 'react-router-dom'
import { loadStudents, handleDeleteCheckBox } from '../common/Common'
import { deleteRequest } from "../routes/Routes"
import { toast } from "react-toastify"

function AdminStudent() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    console.log(students);

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
                    <th scope="row" >
                        <input type="checkbox" style={{ marginRight: 10 + "px" }}
                            id={'studentDelete' + data.id}
                            checked={selectedRows.includes(data.id)}
                            onChange={() => handleDeleteCheckBoxFunction(data.id)}
                        />
                    </th>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.dob}</td>
                    <td>{data.gpa}</td>
                    <td>{data.gender}</td>
                    <td>{data.email}</td>
                    <td><button id={'student' + index} onClick={() => navigate('/addStudent/edit/' + data.id)}>Edit</button></td>
                </tr>
            );
        });
        return body;
    };

    const handleDeleteCheckBoxFunction = (id) => {
        setSelectedRows([...handleDeleteCheckBox(id, selectedRows)]);
    };

    const deleteFunction = () => {
        selectedRows.forEach((row, index) => {
            deleteRequest('/api/student/' + row).then(response => {
                console.log(response);
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
                        if (selectedRows.length === index + 1) {
                            setStudents(values => values.filter(function (data) {
                                return !selectedRows.includes(data.id);
                            }));
                            setSelectedRows([]);
                            toast.success('Successfully deleted Student', {
                                position: "bottom-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }
                } else {
                    toast.error('An error occurred!', {
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
        });
    };

    return (

        <div className='adminstudent-main-container'>
            <div className='adminstudent-main-wrapper'>
                <div className='adminstudent-left'>
                    <SlideBar />
                </div>
                <div className='adminstudent-right'>
                    <div>
                        <h1>Admin Student</h1>
                    </div>
                    <div className='adminstudent-right-sub-topic'>
                        <div> <h2>Student List</h2></div>
                        <div className='adminstudent-right-sub-topic-button'>
                            <button onClick={() => navigate('/addStudent/add')}>Add Student</button>
                            <button onClick={deleteFunction}
                                disabled={selectedRows.length === 0}
                                style={{ backgroundColor: '#f54a4a' }}>Delete Student</button>
                        </div>

                    </div>
                    <div className='adminstudent-table-main'>
                        <table className='adminstudent-table'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>GPA</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th>Edit Details</th>
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

export default AdminStudent
