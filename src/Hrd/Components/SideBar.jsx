import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NAMES, USER_ID, USER_TOKEN, BASE_URL } from '../../fetch/fetch';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import './sidebar.css'
import { nawastraIcon } from '../../Components/images/images';
import ListBar from './ListBar';

const drawerWidth = 245;

function SideBar(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [users, setUsers] = React.useState([])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getUsers = () => {
    axios.get(`${BASE_URL}/users/employees/${USER_ID}/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setUsers(res)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getUsers(), [USER_ID])

  const drawer = (
    <div >
      <div className="d-flex justify-content-center mt-4 mb-4">
          <img src={nawastraIcon}
           width={70} height={70} alt="" />
      </div>
      <div className="text-center">
          <span className='text-secondary'>
            <b>
              {capitalizeFirstLetter(NAMES)} | {USER_ID}{users.employee_joined ? users.employee_joined.toString().replace(/\s/g,'-') : '24124321'} | {users.division} 
            </b> 
          </span>
      </div>
      {/* <Toolbar /> */}
      <Divider />
      <small className='text-secondary container'>Pengajuan Karyawan</small>
      <ListBar />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:'#0b305a', color:'white' 
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Nawastra
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          style={{ background:'red' }}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    
    </Box>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBar;