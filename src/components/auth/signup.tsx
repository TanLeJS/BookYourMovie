"use client"
import { sendRequest } from '@/utils/api';
import { useToast } from '@/utils/toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormControlLabel, FormGroup, IconButton, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface SignUpProps {
    isOpenSignUp: boolean;
    setIsOpenSignUp: (isOpenSignUp: boolean) => void;
}

const SignUp = (props: SignUpProps) => {
    const { isOpenSignUp, setIsOpenSignUp } = props
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [showConfirmedPassword, setShowConfirmedPassword] = React.useState<boolean>(false)

    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = React.useState("")
    const [name, setName] = React.useState("")
    const [phone, setPhone] = React.useState("")

    const [isErrorEmail, setIsErrorEmail] = React.useState<boolean>(false)
    const [isErrorPassword, setIsErrorPassword] = React.useState<boolean>(false)

    const [errorEmail, setErrorEmail] = React.useState<string>("")
    const [errorPassword, setErrorPassword] = React.useState<string>("")

    const [isErrorConfirmedPassword, setIsErrorConfirmedPassword] = React.useState<boolean>(false)
    const [errorConfirmedPassword, setErrorConfirmedPassword] = React.useState<string>("")

    const [isAgree, setIsAgree] = React.useState(true);

    const toast = useToast();
    const router = useRouter();
    const { data: session } = useSession();


    const handleSubmit = async () => {
        if (!name) {
            toast.error("Name is empty")
            return;
        }

        if (!phone) {
            toast.error("Phone number is empty");
        }


        if (!email) {
            toast.error("Email is empty")
            return;
        }

        if (!password) {
            toast.error("Password is empty")
            return;
        }

        if (!confirmedPassword) {
            toast.error("Please confirm your password")
            return;
        }

        if (password !== confirmedPassword) {
            toast.error("Your confirming password does not match your password")
        }

        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
            method: "POST",
            body: { email, password, name, phone },
        })

        if (res.data) {
            toast.success("Create a playlist successfully")
            setIsOpenSignUp(false)
            setEmail("")
            setPassword("")
            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: "POST",
                queryParams: {
                    tag: "playlist-by-user",
                    secret: "justArandomString"
                }
            })
            router.refresh();
        }
        else {
            toast.error(res.message)
        }
    }

    return (
        <div>
            <Button onClick={() => setIsOpenSignUp(true)}>
                Sign Up
            </Button>
            <Dialog open={isOpenSignUp} onClose={() => setIsOpenSignUp(false)} maxWidth={"sm"} fullWidth>
                <DialogTitle>Create a new account</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", gap: "20px", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                        <TextField
                            onChange={(event) => setName(event.target.value)}
                            variant='outlined'
                            margin='normal'
                            required
                            label="Name"
                            name="name"
                            autoFocus
                            fullWidth
                            sx={{
                                gap: "10px"
                            }}
                        />
                        <TextField
                            onChange={(event) => setPhone(event.target.value)}
                            variant='outlined'
                            margin='normal'
                            required
                            label="Phone"
                            name="phone"
                            autoFocus
                            fullWidth
                        />

                    </Box>
                    <Box sx={{ display: "flex", gap: "5px", flexDirection: "column", width: "100%" }}>
                        <TextField
                            onChange={(event) => setEmail(event.target.value)}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label="Email"
                            name="Email"
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
                        <TextField
                            onChange={(event) => setConfirmedPassword(event.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit()
                                }
                            }}
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label="Confirm Password"
                            name="confirmedPassword"
                            type={showConfirmedPassword ? "text" : "password"}
                            error={isErrorConfirmedPassword}
                            helperText={errorConfirmedPassword}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}>
                                        {showConfirmedPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isAgree}
                                        onChange={(event) => setIsAgree(event.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }} />
                                }
                                label="I agree to the Terms and Conditions"
                            />
                        </FormGroup>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpenSignUp(false)}>Close</Button>
                    <Button
                        onClick={() => handleSubmit()}
                        disabled={!isAgree}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SignUp
