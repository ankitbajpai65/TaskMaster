import React, { useState, useContext, useRef } from 'react';
import { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from './DataProvider';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F1F3F4',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '30%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar({ displayLogoutBtn, setDisplayLogoutBtn }) {

    const navigate = useNavigate();
    const searchRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [search, setSearch] = useState('')
    const { todos, setTodos } = useContext(UserContext);

    const loginClicked = () => {
        console.log(`Login clcked`);
        navigate('/login');
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    // FOR SEARCHING THE TODOS

    const handleSearchInput = (e) => {
        setSearch(e.target.value)
    }

    const filterTodos = (e) => {
        if (e.key === 'Enter') {
            console.log(search);
            console.log(todos);
            const filteredItems = todos.filter((val) => {
                return val.title.toLowerCase().includes(search.toLowerCase())
            })
            console.log(filteredItems);
            setTodos(filteredItems);
        }
    }

    // LOGOUT FUNCTION

    const handleLogout = () => {
        signOut(auth).then(() => {
            // alert(`You are successfully logged out!`)
            toast.success("Your have been successfully logged out!", {
                position: "top-center",
                theme: "dark"
            });
        }).catch((error) => {
            alert(error.message);
        });
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // console.log(user);
            if (user)
                setDisplayLogoutBtn(true);
            else
                setDisplayLogoutBtn(false);
        })
    })
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                {/* <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton> */}
                <Button variant="outlined">Outlined</Button>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: 'white', color: 'black' }}>
                    <Toolbar sx={{
                        justifyContent: "space-between"
                    }}>
                        <Stack direction="row" alignItems="center">
                            {/* <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton> */}
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer', fontWeight: '500' } }}
                                onClick={() => { navigate('/') }}
                            >
                                TaskMaster
                            </Typography>

                        </Stack>
                        <Search xs={6}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                value={search}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearchInput}
                                onKeyUp={(e) => filterTodos(e)}
                                ref={searchRef}
                            />
                        </Search>
                        {/* <Box sx={{ flexGrow: 1 }} /> */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {/* <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle sx={{ fontSize: '2rem' }} />
                        </IconButton> */}

                            {
                                !displayLogoutBtn ?
                                    <Button variant="contained" onClick={loginClicked}>Login</Button>
                                    :
                                    <Button variant="contained" onClick={handleLogout}
                                        style={{ backgroundColor: "grey" }}
                                    >Logout</Button>

                            }
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
            <ToastContainer />
        </>
    );
}