import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container, useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextAreaWithDate from './AddTaskComp.js';
import ContentBox from './ReadTaskComp.js';
import EditableTextArea from './modifyTaskComp.js';
import CompletedTasks from './completedTaskComp.js';
import PendingTasks from './pendingtaskcomp.js';
import DeleteTasks from './DelTaskComp.js';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: isSmallScreen ? 2 : 4 }}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: isSmallScreen ? 'background.paper' : 'transparent',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="responsive tabs example"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Add Task" {...a11yProps(0)} />
            <Tab label="Read Task" {...a11yProps(1)} />
            <Tab label="Modify Task" {...a11yProps(2)} />
            <Tab label="Completed Task" {...a11yProps(3)} />
            <Tab label="Pending Task" {...a11yProps(4)} />
            <Tab label="Delete Task" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <TextAreaWithDate/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <ContentBox/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <EditableTextArea/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
        <CompletedTasks/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <PendingTasks/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <DeleteTasks/>
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
