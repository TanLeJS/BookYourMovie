"use client"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Dialog, DialogContent, Divider, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface SignInProps {
    isOpenSignIn: boolean;
    setIsOpenSignUp: (isOpenSignUp: boolean) => void;
    setIsOpenSignIn: (isOpenSignIn: boolean) => void;

}
const CheckOutSignInModal = (props: SignInProps) => {
    const { isOpenSignIn, setIsOpenSignIn, setIsOpenSignUp, } = props;

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
        <Dialog open={isOpenSignIn} onClose={() => setIsOpenSignIn(false)} maxWidth="xs" fullWidth>
            <DialogContent sx={{ padding: '2rem', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: '1.5rem' }}>
                    Log in to TCinema Crown Club
                </Typography>

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
                    sx={{ marginBottom: '1rem' }}
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
                    variant="contained"
                    color="warning"
                    fullWidth
                    sx={{ marginBottom: '1rem', fontWeight: 700 }}
                    onClick={() => handleSubmit()}
                >
                    LOG IN
                </Button>

                <Typography sx={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    Create Free Account
                    <span style={{ color: '#FF6600', fontWeight: 600, cursor: 'pointer', marginLeft: "5px" }}
                        onClick={() => {
                            setIsOpenSignIn(false)
                            setIsOpenSignUp(true)
                        }}
                    >Join for free
                    </span>
                </Typography>
                <Typography sx={{ fontSize: '0.875rem' }}>
                    Forgot Password? <span style={{ color: '#FF6600', fontWeight: 600, cursor: 'pointer' }}>Reset it</span>
                </Typography>

                <Divider sx={{ marginY: '1rem' }}>OR</Divider>

                <Button variant="contained" sx={{
                    background: "linear-gradient(180deg,#000 0%,#3C3C3C 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    '&:hover': { background: '#000' }
                }} fullWidth
                    onClick={() => {
                        setIsOpenSignIn(!isOpenSignIn)
                    }}
                >
                    CONTINUE AS GUEST
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CheckOutSignInModal