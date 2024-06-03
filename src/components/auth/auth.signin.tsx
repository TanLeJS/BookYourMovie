"use client"

import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Alert, Box, Button, Dialog, Divider, IconButton, InputAdornment, Link, Snackbar, TextField, Typography } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface SignInProps {
    isOpenSignIn: boolean;
    setIsOpenSignUp: (isOpenSignUp: boolean) => void;
    setIsOpenSignIn: (isOpenSignIn: boolean) => void;
}

const AuthSignIn = (props: SignInProps) => {
    const { isOpenSignIn, setIsOpenSignIn, setIsOpenSignUp } = props;
    const router = useRouter()

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false)
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false)

    const [errorEmail, setErrorEmail] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")

    const [openMessage, setOpenMessage] = useState<boolean>(false)
    const [resMessage, setResMessage] = useState<string>("")


    const handleSubmit = async () => {
        setIsErrorEmail(false)
        setIsErrorPassword(false)
        setErrorEmail("")
        setErrorPassword("")
        if (!email) {
            setIsErrorEmail(true)
            setErrorEmail("Username is not empty")
            return
        }
        if (!password) {
            setIsErrorPassword(true)
            setErrorPassword("Password is not empty")
            return
        }
        const res = await signIn("credentials", {
            username: email,
            password: password,
            redirect: false
        })
        if (!res?.error) {
            router.push("/")
        }
        else {
            setOpenMessage(true)
            setResMessage(res.error)
        }
    }



    return (
        <div>
            <Button onClick={() => setIsOpenSignIn(true)}>
                Sign In
            </Button>
            <Dialog open={isOpenSignIn} onClose={() => setIsOpenSignIn(false)} maxWidth={"sm"} fullWidth>
                <DialogTitle>Sign In</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", gap: "5px", flexDirection: "column", width: "100%" }}>
                        <TextField
                            onChange={(event) => setEmail(event.target.value)}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            autoFocus
                            error={isErrorEmail}
                            helperText={errorEmail}
                        />
                        <TextField
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit()
                                }
                            }}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorPassword}
                            helperText={errorPassword}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                        <Button
                            sx={{
                                my: 3,
                                bgcolor: "orange"
                            }}
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                        <Box
                            sx={{
                                display: "flex",
                                direction: "row",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="body2" gutterBottom>
                                You have not have an account yet?
                            </Typography>
                            <Link
                                component="button"
                                variant="body2"
                                sx={{
                                    marginLeft: 0.5,
                                    marginBottom: 0.5,
                                }}
                                onClick={() => {
                                    setIsOpenSignIn(false)
                                    setIsOpenSignUp(true)
                                }}
                            >
                                Register here
                            </Link>
                        </Box>
                        <Divider>Or</Divider>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "25px",
                                mt: 3,
                            }}
                        >
                            <Button
                                sx={{
                                    cursor: "pointer",
                                }}
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                onClick={() => {
                                    signIn("google")
                                }}
                                fullWidth
                            >
                                Login with google
                            </Button>

                        </Box>
                    </Box>
                </DialogContent>
                <Snackbar
                    open={openMessage}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => setOpenMessage(false)}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        {resMessage}
                    </Alert>
                </Snackbar>
            </Dialog >
        </div >
    )
}

export default AuthSignIn