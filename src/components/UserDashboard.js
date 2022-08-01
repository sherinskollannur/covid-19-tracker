import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './UserDashboard.css';
import styled from '@emotion/styled';
import VaccineInfoTable from './VaccineInfoTable';
import { Route } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import ContactUs from './ContactUs';
import { useHistory } from 'react-router-dom';
import DonateInfo from './DonateInfo';

const drawerWidth = 240;
export default function UserDashboard(props) {
  const [sliderBtnActive, setSliderBtnActive] =
    React.useState('Vaccine  Needed');

  const history = useHistory();

  const Classes = styled(Toolbar)({
    backgroundColor: '#8f0909',
  });

  // const classes = useStyles();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
          // style={{ backgroundColor: 'red' }}
          // className={classes.dashboard_header}
        >
          <Classes>
            <Typography variant="h6" noWrap component="div">
              <strong> User Dashboard</strong>
            </Typography>
          </Classes>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {['Vaccine  Needed', 'Order History', 'Contact Us'].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    style={
                      sliderBtnActive === text
                        ? {
                            backgroundColor: '#6d7870',
                            color: 'white',
                            textAlign: 'center',
                            // borderRadius: 5,
                            padding: 8,
                          }
                        : {
                            backgroundColor: 'white',
                            color: 'black',
                            textAlign: 'center',
                            // borderRadius: 5,
                            padding: 8,
                          }
                    }
                    onClick={(e) => {
                      setSliderBtnActive(text);

                      let routeVal;
                      if (text === 'Vaccine  Needed') {
                        routeVal = '/user_dashboard';
                      }
                      if (text === 'Order History') {
                        routeVal = '/user_dashboard/order_history';
                      }
                      if (text === 'Contact Us') {
                        routeVal = '/user_dashboard/contact_us';
                      }

                      history.push(routeVal);
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Divider />
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />

          <Route path="/user_dashboard" exact>
            <VaccineInfoTable />
          </Route>
          <Route path="/user_dashboard/order_history">
            <OrderHistory />
          </Route>
          <Route path="/user_dashboard/contact_us">
            <ContactUs />
          </Route>
          <Route path="/user_dashboard/donate_info">
            <DonateInfo />
          </Route>
        </Box>
      </Box>
    </>
  );
}
