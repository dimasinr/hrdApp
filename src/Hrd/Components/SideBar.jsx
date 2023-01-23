import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
import {FactCheck, AutoStories, Logout, DateRange, Person, Dashboard, Badge} from '@mui/icons-material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NAMES, ROLES, USER_ID, USER_TOKEN, BASE_URL } from '../../fetch/fetch';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 245;

function SideBar(props) {

  const navigate = useNavigate()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [users, setUsers] = React.useState([])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

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
          <img src="https://media.licdn.com/dms/image/C560BAQFTYr9fTg4UWA/company-logo_200_200/0/1592484860827?e=2147483647&v=beta&t=q2WiLQyOg4xZxA7e3wFA7pkl80rwlcEM3oh1XAOkDPM"
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
      {ROLES === 'hrd' ? 
      <List>
      <Link to="/home" style={{ textDecoration:'none', color:'black' }}>
      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard sx={{ color:'#0B305A' }} />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to="/list-pengajuan" style={{ textDecoration:'none', color:'black' }}>
      <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FactCheck sx={{ color:'#0B305A' }} />
            </ListItemIcon>
            <ListItemText primary='List Pengajuan Karyawan' />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <small className='text-secondary container'>Menu HRD</small>
      <Link to="/notes" style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AutoStories sx={{ color:'#0B305A' }} />
            </ListItemIcon>
            <ListItemText primary='Catatan HRD' />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to="/calendar-cuti" style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DateRange sx={{ color:'#0B305A' }} />
            </ListItemIcon>
            <ListItemText primary='Kalender Cuti' />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <small className='text-secondary container'>Manajemen Karyawan</small>
      <Link to='/employee/absensi' style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Badge sx={{ color:'#0B305A' }} />
            </ListItemIcon>
            <ListItemText primary='Absensi Karyawan' />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to="/list-karyawan" style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Person sx={{ color:'#0B305A' }} />
            </ListItemIcon>
            <ListItemText primary='List Karyawan' />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <small className='text-secondary container'>Pengaturan</small>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Logout sx={{ color:'red' }} />
            </ListItemIcon>
            <ListItemText primary='Keluar' />
          </ListItemButton>
        </ListItem>
    </List>
      : null
      }
      {ROLES === 'karyawan' ? 
      <List>
        <Link to="/home" style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard sx={{ color:'#0B305A' }} />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/list-pengajuan" style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FactCheck sx={{ color:'#0B305A' }} />
              </ListItemIcon>
              <ListItemText primary='List Pengajuan' />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <small className='text-secondary container'>Pengaturan</small>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Logout sx={{ color:'red' }} />
            </ListItemIcon>
            <ListItemText primary='Keluar' />
          </ListItemButton>
        </ListItem>
      </List>
      : null}
      {ROLES === 'atasan' ? 
      <List>
        <Link to="/home" style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard sx={{ color:'#0B305A' }} />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/list-pengajuan/karyawan/" style={{ textDecoration:'none', color:'black' }}>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FactCheck sx={{ color:'#0B305A' }} />
              </ListItemIcon>
              <ListItemText primary='List Pengajuan' />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <small className='text-secondary container'>Pengaturan</small>
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <Logout sx={{ color:'red' }} />
              </ListItemIcon>
              <ListItemText primary='Keluar' />
            </ListItemButton>
          </ListItem>
      </List>
      : null}
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
            Hallo, Selamat Datang
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