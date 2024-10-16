"use client"
import { fetchDefaultImages } from '@/utils/api';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import MovieIcon from '@mui/icons-material/Movie';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import AuthSignIn from '../auth/auth.signin';
import SignUp from '../auth/signup';

// styled - component

export default function AppHeader() {

    const { data: session } = useSession()
    const router = useRouter()

    const [isOpenSignUp, setIsOpenSignUp] = React.useState(false)
    const [isOpenSignIn, setIsOpenSignIn] = React.useState(false)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <Link
                    href={`/profile/${session?.user._id}`}
                    style={{
                        color: "unset",
                        textDecoration: "unset"
                    }}
                >My Account
                </Link>
            </MenuItem>
            <MenuItem onClick={() => {
                handleMenuClose();
                signOut()
            }} >Log out</MenuItem>
        </Menu >
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
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const handleRedirectHome = () => {
        router.push("/")
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "white"
                }}
            >
                <Container>
                    <Toolbar>
                        <MovieIcon color="primary" />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                cursor: "pointer",
                                color: "black"
                            }}
                            onClick={() => handleRedirectHome()}
                        >
                            TCinema
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: "20px",
                            alignItems: "center",
                            cursor: "pointer",
                            "a": {
                                color: "unset",
                                textDecoration: "unset",
                                padding: "5px",
                                "&.active": {
                                    background: "#3b4a59",
                                    color: "#cefaff",
                                    borderRadius: "5px"
                                }
                            }
                        }}>
                            {
                                session ?
                                    <>
                                        <Image
                                            src={fetchDefaultImages(session.user.type)}
                                            onClick={handleProfileMenuOpen}
                                            height={35}
                                            width={35}
                                            alt='avatar'
                                        />
                                    </> :
                                    <>
                                        <SignUp
                                            isOpenSignUp={isOpenSignUp}
                                            setIsOpenSignUp={setIsOpenSignUp}
                                        />
                                        <AuthSignIn
                                            setIsOpenSignUp={setIsOpenSignUp}
                                            isOpenSignIn={isOpenSignIn}
                                            setIsOpenSignIn={setIsOpenSignIn}
                                        />
                                    </>
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
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}