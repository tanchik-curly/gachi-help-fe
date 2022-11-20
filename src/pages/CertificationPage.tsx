import React from 'react';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { ApplicationsHistoryTabPanel } from 'components/CertificationsTabPanels/ApplicationsHistoryTabPanel';
import { ApplicationsTabPanel } from 'components/CertificationsTabPanels/ApplicationsTabPanel';
import { CertificationsHistoryTabPanel } from 'components/CertificationsTabPanels/CertificationsHistoryTabPanel';

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
export const CertificationPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  });

  return (
    <Box width="100%" mt={5}>
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
          Сертифікація та працевлаштування
        </Typography>
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
            label="За кількістю поданих заявок"
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
            label="Історія заявок на біржу"
            sx={{ textTransform: 'none', color: '#828282' }}
            {...a11yProps(1)}
          />
          <Tab
            label="Історій пройдених сертифікацій"
            sx={{ textTransform: 'none', color: '#828282' }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ApplicationsHistoryTabPanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ApplicationsTabPanel />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CertificationsHistoryTabPanel />
      </TabPanel>
    </Box>
  );
};
