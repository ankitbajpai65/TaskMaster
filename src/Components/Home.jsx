import React, { useState, useEffect, useContext } from 'react'
import BasicModal from './BasicModal'
import Todo_Card from './Todo_Card';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import '../style/Add_Todo.css'
import '../style/BasicModal.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from './firebase.jsx'
import { collection, query, where, addDoc, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { UserContext } from './DataProvider';


const Home = ({ displayLogoutBtn }) => {
    const [open, setOpen] = useState(false);
    const [inputData, setInputData] = useState({
        // id: '',
        title: '',
        desc: ''
    })
    // const [todos, setTodos] = useState([]);
    const { todos, setTodos } = useContext(UserContext);
    const [isEditClicked, setIsEditClicked] = useState(false)

    const handleOpen = () => {
        if (auth.currentUser == null) {
            toast.info("Please login to add notes", {
                position: "top-center",
                theme: "dark"
            });
            return;
        }
        setOpen(true);
        setInputData({ title: '', desc: '' })
    }
    const handleClose = () => {
        setOpen(false);
        setIsEditClicked(false)
        setInputData({ title: '', desc: '' })
    }

    // FETCHING TODOS

    const getData = async (userId) => {
        // console.log(`getData calls`)
        try {
            const userDocRef = doc(collection(db, 'users'), userId);
            const todosQuery = collection(userDocRef, 'todos');

            const querySnapshot = await getDocs(todosQuery);
            const allTodos = querySnapshot.docs.map((doc) => {
                return ({ ...doc.data(), id: doc.id })
            });
            setTodos(allTodos);
        } catch (error) {
            console.error('Error fetching user todos:', error);
        }
    }

    // DELETE TODO

    const deleteTodo = async (todoId) => {
        const checkToDelete = confirm(`Are you sure want to delete this todo?`)

        if (checkToDelete) {
            const todoRef = doc(db, 'users', auth.currentUser.uid, 'todos', todoId);
            deleteDoc(todoRef)
                .then(() => {
                    console.log('Todo successfully deleted');
                })
                .catch((error) => {
                    console.error('Error deleting todo: ', error);
                });
        }
        getData(auth.currentUser.uid)
    }

    // UPDATE TODOS

    const updateTodo = (todoId) => {
        // console.log("update runs", todoId);
        const todoRef = doc(db, 'users', auth.currentUser.uid, 'todos', todoId);
        updateDoc(todoRef, inputData)
            .then(() => {
                console.log('Todo successfully updated');
            })
            .catch((error) => {
                console.error('Error updating todo: ', error);
            });

        getData(auth.currentUser.uid)
        setIsEditClicked(false);
        handleClose()
    }

    useEffect(() => {
        const myTodos = localStorage.getItem('todos');
        if (myTodos) {
            setTodos(JSON.parse(myTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        // getData(auth.currentUser.uid)
    }, [todos]);

    useEffect(() => {
        setTimeout(() => {
            getData(auth.currentUser.uid)
        }, 3000)
    }, [], [displayLogoutBtn]);

    return (
        <>
            {
                !auth.currentUser ?
                    <div style={{
                        height: '91vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <h1 style={{ marginBottom: '10rem', fontSize: '3rem' }}>Please Login to add and view todos!</h1>
                    </div>
                    :
                    <>
                        <button className="addBtn" onClick={handleOpen}>
                            < AddIcon className='addIcon' />
                        </button>
                        <BasicModal open={open} handleClose={handleClose} inputData={inputData} setInputData={setInputData} isEditClicked={isEditClicked} setIsEditClicked={setIsEditClicked} getData={getData} updateTodo={updateTodo} />
                        {
                            todos.length == 0 ?
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
                                        todos.map((val, _) => {
                                            {/* console.log(val) */ }
                                            return (
                                                <Todo_Card key={val.id} id={val.id} title={val.title} desc={val.desc} deleteTodo={deleteTodo} handleOpen={handleOpen} setIsEditClicked={setIsEditClicked} setInputData={setInputData} />
                                            )
                                        })
                                    }
                                </div>
                        }
                    </>
            }
            <ToastContainer />
        </>
    )
}

export default Home