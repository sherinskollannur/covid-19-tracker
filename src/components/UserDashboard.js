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
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
// import { authAction } from '../../store/auth';
// import { useDispatch } from 'react-redux';

const drawerWidth = 240;
const navItems = ['Logout'];
export default function UserDashboard(props) {
  const [sliderBtnActive, setSliderBtnActive] =
    React.useState('Vaccine  Needed');

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const history = useHistory();

  const Classes = styled(Toolbar)({
    backgroundColor: '#8f0909',
  });

  // const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logOutHandler = () => {
    // dispatch(authAction.isLogout());
    // history.push('/');
  };

  return (
    <>
      {/* <AppBar
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
      </AppBar> */}

      <AppBar
        component="nav"
        style={{ backgroundColor: '#8f0909' }}
        sx={{
          width: { sm: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                sm: 'block',
              },
              textAlign: 'left',
            }}
          >
            MyCare
          </Typography> */}
          {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={logOutHandler}>
                {item}
              </Button>
            ))}
          </Box> */}
          <Classes>
            <Typography variant="h6" noWrap component="div">
              <strong> User Dashboard</strong>
            </Typography>
          </Classes>
        </Toolbar>
      </AppBar>
      {/* <div style={{ display: 'flex', minHeight: '600px' }}></div> */}
      <Box sx={{ display: 'flex', Height: '100px' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },

            // display: { md: 'none' },
          }}
          variant={{ sm: 'temporary' }}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="left"
          className="visibleDrawer"
          // sx={{ mr: 2, display: { md: 'none' } }}
        >
          <Toolbar />
          <Divider />
          <List>
            {[
              'Vaccine  Needed',
              'Order History',
              'Covid Tracker',
              'Contact Us',
              'Logout',
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  style={
                    sliderBtnActive === text
                      ? {
                          backgroundColor: '#b3bdbd',
                          color: 'black',
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
                    if (text === 'Covid Tracker') {
                      routeVal = '/';
                    }

                    history.push(routeVal);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },

            // display: { md: 'none' },
          }}
          variant="permanent"
          anchor="left"
          className="visibleDrawer2"
          // sx={{ mr: 2, display: { md: 'none' } }}
        >
          <Toolbar />
          <Divider />
          <List>
            {[
              'Vaccine  Needed',
              'Order History',
              'Covid Tracker',
              'Contact Us',
              'Logout',
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  style={
                    sliderBtnActive === text
                      ? {
                          backgroundColor: '#b3bdbd',
                          color: 'black',
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
                    if (text === 'Covid Tracker') {
                      routeVal = '/';
                    }

                    history.push(routeVal);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
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
