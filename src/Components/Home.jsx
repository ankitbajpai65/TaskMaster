import React, { useState, useRef } from 'react'
import AddButton from './AddButton'
import BasicModal from './BasicModal'
import Todo_Card from './Todo_Card';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import '../style/Add_Todo.css'
import '../style/BasicModal.css'
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
    const [open, setOpen] = useState(false);
    const [inputData, setInputData] = useState({
        id: '',
        title: '',
        desc: ''
    })
    const [data, setData] = useState([]);
    const [isEditClicked, setIsEditClicked] = useState(false)

    console.log(auth.currentUser);
    const handleOpen = () => {
        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         alert(`Please login to add notes`)
        //         return;
        //     }
        // })
        if (auth.currentUser == null) {
            // alert(`Please login to add notes`)
            toast.info("Please login to add notes", {
                position: "top-center",
                theme: "dark"
            });
            return;
        }

        setOpen(true);
        if (!isEditClicked)
            setInputData({ id: '', title: '', desc: '' })
    }
    const handleClose = () => {
        setOpen(false);
        setIsEditClicked(false)
        setInputData({ id: '', title: '', desc: '' })
    }

    // DELETE TODO
    const deleteTodo = (id) => {
        const filteredTodos = data.filter((val) => {
            return val.id !== id;
        })
        if (confirm('Are you sure you want to delete this?'))
            setData(filteredTodos);
    }

    return (
        <>
            <button className="addBtn" onClick={handleOpen}>
                < AddIcon className='addIcon' />
            </button>
            <BasicModal open={open} handleClose={handleClose} inputData={inputData} setInputData={setInputData} data={data} setData={setData} isEditClicked={isEditClicked} setIsEditClicked={setIsEditClicked} />
            {
                data.length == 0 ?
                    <div style={{
                        height: '91vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <h1 style={{ marginBottom: '10rem', fontSize: '3rem' }}>Your notes list is empty!</h1>
                    </div>
                    :
                    <div className="cardDiv">
                        {
                            data.map((val, _) => {
                                {/* console.log(val) */ }
                                return (
                                    <Todo_Card key={val.id} id={val.id} title={val.title} desc={val.desc} deleteTodo={deleteTodo} handleOpen={handleOpen} setIsEditClicked={setIsEditClicked} inputData={inputData} setInputData={setInputData} data={data} setData={setData} />
                                )
                            })
                        }
                    </div>
            }
            <ToastContainer />
        </>
    )
}

export default Home