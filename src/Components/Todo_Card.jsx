import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../style/BasicModal.css'

export default function Todo_Card({ id, title, desc, deleteTodo, handleOpen, setIsEditClicked, setInputData }) {

    const editTodo = (todoId) => {
        console.log(title, desc);
        handleOpen()
        setInputData({ todoId, title, desc });
        setIsEditClicked(true)
    }
    return (
        <Card sx={{ minWidth: 275, position: 'relative' }} className="cards">
            <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {desc}
                </Typography>
            </CardContent>
            <CardActions sx={{
                // float: 'right',
                position: 'absolute',
                right: '0rem',
                bottom: '0rem'
            }}>
                <IconButton aria-label="delete" onClick={() => editTodo(id)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => deleteTodo(id)}>
                    <DeleteIcon className='deleteIcon' />
                </IconButton>
            </CardActions>
        </Card>
    );
}