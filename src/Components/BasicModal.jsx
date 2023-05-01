import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../style/BasicModal.css'
import Button from '@mui/material/Button';
import { v4 as uuid } from 'uuid';
import { set, ref } from 'firebase/database'

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

export default function BasicModal({ open, handleClose, inputData, setInputData, data, setData, isEditClicked, setIsEditClicked }) {

    // const [inputData, setInputData] = useState({
    //     id: '',
    //     title: '',
    //     desc: ''
    // })

    const inputEvent = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        // console.log(name, value);
        if (!isEditClicked)
            setInputData({ ...inputData, [name]: value, id: uuid() });
        else
            setInputData({ ...inputData, [name]: value });

    }
    const addTodo = () => {
        console.log(inputData);
        if (isEditClicked) {
            setData(prevData => {
                return prevData.map((data) => {
                    if (data.id == inputData.id) {
                        return inputData;
                    } else {
                        return data;
                    }
                })
            });
            setIsEditClicked(false);
        }
        else {
            setData([...data, inputData]);
        }
        handleClose();
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