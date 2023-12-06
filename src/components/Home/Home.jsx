import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './homePage.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box className="content">
      <Typography component="h2" variant="h2">
        Ký túc xá Sinh viên số 1 thế giới
      </Typography>
      <Typography component="p">Nơi nuôi dưỡng giấc mơ của sinh viên</Typography>
      <Link to="/login">
        <Button variant="contained" type="button">
          Đăng nhập ngay
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
