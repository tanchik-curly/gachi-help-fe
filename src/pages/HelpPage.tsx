import React from 'react';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

export const HelpPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  });

  return (
    <Box width="100%" mt={7}>
      <Box
        padding={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          sx={{ fontWeight: 'medium', color: '#828282', fontSize: 32 }}
        >
          Getting Help
        </Typography>
        <Button sx={{ width: '200px', height: '52px' }} variant="contained">
          Profile
        </Button>
      </Box>
      <Box sx={{ padding: 0, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          sx={{ marginLeft: 2, color: 'white' }}
          TabScrollButtonProps={{
            style: {
              color: '#fff',
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="За періодом"
            sx={{
              textTransform: 'none',
              color: '#828282',
              '.Mui-selected': {
                color: 'red',
              },
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="За кількістю"
            sx={{ textTransform: 'none', color: '#828282' }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        За періодом
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};
