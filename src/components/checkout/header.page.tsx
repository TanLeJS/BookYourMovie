"use client"

import MovieIcon from '@mui/icons-material/Movie';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const CustomTab = styled(Tab)(({ theme }) => ({
    textTransform: 'uppercase',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px 20px',
    minWidth: 'unset',
    '&.Mui-selected': {
        color: '#ff6600',
        borderBottom: '2px solid #ff6600',
    },
    '&:not(.Mui-selected)': {
        color: '#666',
    },
}));

const CheckOutHeader = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', display: 'flex', alignItems: 'center' }}>
            <Container>
                <Container sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <MovieIcon sx={{
                            marginRight: "10px"
                        }} />
                        <Typography variant="h6" sx={{ color: '#ff6600' }}>
                            REGAL
                        </Typography>
                    </Box>
                    <Tabs value={value} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <CustomTab label="TICKETS" />
                        <CustomTab label="SEATS" />
                        <CustomTab label="PAYMENT" />
                    </Tabs>
                </Container>
            </Container>
        </Box>
    );
};

export default CheckOutHeader;
