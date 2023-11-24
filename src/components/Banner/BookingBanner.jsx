import { Box, Typography } from '@mui/material';
import React from 'react';
import './banner.css';

const BookingBanner = () => {
  return (
    <Box className="BookingBanner relative">
      <div className=" bg-black/[0.65] w-full h-full flex justify-center items-center flex-col">
        <Typography variant="subtitle1" component="p">
          NOW BOOKING
        </Typography>
        <Typography variant="h3">Private Dinners & Happy Hours</Typography>
      </div>
    </Box>
  );
};

export default BookingBanner;
