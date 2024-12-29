import React from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main', 
        color: 'white',
        py: 3, // Padding on the top and bottom
        paddingBottom:10,
        marginTop:5,
        mx: {xl:27,md:4,sm:0,lg:15}
      }} 
    >
      <Container maxWidth="lg" component="footer"  sx={{ textAlign: 'center' }}>
        {/* Header */}
        <Typography variant="h6" component="div" gutterBottom>
          Contact Us
        </Typography>

        {/* Contact Options */}
        <Box>
          {/* LinkedIn */}
          <IconButton
            component={Link}
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white', mx: 1 }}
          >
            <LinkedInIcon />
          </IconButton>
          {/* Gmail */}
          <IconButton
            component={Link}
            href="mailto:your-email@gmail.com"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white', mx: 1 }}
          >
            <EmailIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
