import React from 'react'
import SideBar from '../Hrd/Components/SideBar'
// import Swal from 'sweetalert2';
// import { BASE_URL, USER_TOKEN } from '../fetch/fetch';
// import axios from 'axios';
import {Card, Box, Avatar, Stack, Typography, IconButton, Divider, Switch, Chip} from '@mui/material'
import { LocationOn, Edit, } from '@mui/icons-material'
function Profile() {

    // const [userBerkas, setUserBerkas] = useState([])
    // const submitPetitions = async e => {
    //     try{
    //         const formData = new FormData();
    //         // formData.append("nik", userBerkas.nik);
    //         // formData.append("file_ktp", fileKtp);
    //         // formData.append("no_bpjs", noBpjs);
    //         // formData.append("file_bpjs", fileBpjs);
    //         // formData.append("no_npwp", noNpwp);
    //         // formData.append("file_npwp", fileNpwp);

    //         const res = await axios({
    //             method: 'post',
    //             url:`${BASE_URL}/api/submission/employees/`,
    //             data: formData,
    //             headers: {
    //                 "Authorization" : `Token ${USER_TOKEN}`
    //               }
    //         })
    //         console.log(res)
    //         Swal.fire({
    //             icon: 'success',
    //             title: `${res.data.message}`,
    //             showConfirmButton: false,
    //             timer: 2000
    //           })
    //     }catch(error){
    //         if( error.response &&
    //             error.response.status >= 400 &&
    //             error.response.status <= 500
    //             ){
    //                 Swal.fire({
    //                     icon: 'error',
    //                     title: `Gagal`,
    //                     text: `${error.response.data.message}`,
    //                     showConfirmButton: false,
    //                     timer: 2500
    //                   })
    //                   console.log(error)
    //         }
    //     }
    //   };
    const active = true

return (
    <div id='image__backgrounds' className='d-flex'>
    <SideBar />
    <main className="container" style={{ marginTop:'80px' }}>
        <div className="card shadow-card" style={{border:"none", borderRadius:"12px"}}>
            <div className="card-body">
                <h5>Profile</h5>
                <Card>
                <Box sx={{ p: 2, width: '100%', display: 'flex' }}>
                    <Avatar variant="rounded" src="avatar.jpg" />
                    <Stack spacing={0.5}>
                    <Typography fontWeight="bold">Lucas Smith</Typography>
                    <Typography variant="body2" color="text.secondary">
                    <LocationOn sx={{color: 'grey'}} /> Scranton, PA, United States
                    </Typography>
                    </Stack>
                    <IconButton size="small">
                    <Edit fontSize="small" />
                    </IconButton>
                </Box>
                <Divider />
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                >
                    <Chip
                    label={active ? 'Active account' : 'Inactive account'}
                    color={active ? 'success' : 'default'}
                    size="small"
                    />
                    <Switch />
                </Stack>
                </Card>
                <div class="input-group mb-3">
                    <input type="file" class="form-control" id="inputGroupFile02" />
                    <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <button>Upload</button>
            </div>
        </div>
    </main>
</div>
  )
}

export default Profile
