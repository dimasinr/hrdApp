import styled from "@emotion/styled";
import Pagination from '@mui/material/Pagination';


export const StyledPagination = styled(Pagination)({
    display: 'flex',
    justifyContent: 'end',
    borderRadius: '50%',
    marginTop: '1rem',
    borderColor: '#84B5E7',
    '& .MuiPaginationItem-root': {
      color: '#2C3E50',
      borderRadius: '50%',
      borderColor: '#84B5E7',
  
    },
    '& .Mui-selected': {
      backgroundColor: '#E3EEFA',
      color: '#1976D5',
    },
  });