import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../style/BasicModal.css'
import Button from '@mui/material/Button';
import { v4 as uuid } from 'uuid';
import { auth, db } from './firebase.jsx'
import { collection, query, where, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ open, handleClose, inputData, setInputData, isEditClicked, setIsEditClicked, getData }) {

    const inputEvent = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputData({ ...inputData, [name]: value });

    }
    const addTodo = async (e) => {
        e.preventDefault();

        if (!isEditClicked) {
            try {
                const docRef = await addDoc(collection(db, "users", auth.currentUser.uid, "todos"), inputData);
                // console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
            handleClose();
            getData(auth.currentUser.uid)
        }
        else {
            // console.log("update runs", todoId);
            const todoRef = doc(db, 'users', auth.currentUser.uid, 'todos', inputData.todoId);
            updateDoc(todoRef, inputData)
                .then(() => {
                    console.log('Todo successfully updated');
                })
                .catch((error) => {
                    console.error('Error updating todo: ', error);
                });
        }
        getData(auth.currentUser.uid);
        setIsEditClicked(false);
        handleClose()
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <input type="text" placeholder='Add title' id="title" name="title" onChange={inputEvent} value={inputData.title} />
                    <textarea row="6" col="10" placeholder='Take a note...' id="description" sx={{ mt: 2 }} name="desc" onChange={inputEvent} value={inputData.desc} />
                    <Button variant="contained"
                        sx={{
                            position: 'absolute',
                            right: '2rem',
                            bottom: '2rem'
                        }}
                        onClick={addTodo}
                    >Add
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}