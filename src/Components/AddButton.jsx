import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import '../style/Add_Todo.css'

const AddButton = () => {
    return (
        <button className="addBtn">
            < AddIcon className='addIcon' />
        </button>
    )
}

export default AddButton