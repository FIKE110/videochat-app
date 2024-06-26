import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function  Toast({open,setOpen}:{open:boolean,setOpen:Function}) {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      event
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={15500} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right' }}
>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your Message was successfully sent
        </Alert>
        
      </Snackbar>
    </div>
  );
}