import {CloseCircleOutlined, CheckOutlined} from '@ant-design/icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useAppDispatch} from 'app/hooks';
import {modalActions} from 'store/modal/modalSlice';

const titleModal = {
  fontSize: '22px',
  fontWeight: 'bold',
  padding: '10px 24px !important',
  borderBottom: '1px solid #ccc',
};
const contentModal = {
  paddingTop: '30px !important',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '400px',
};
const footerModal = {
  padding: '20px 24px !important',
};

export default function ConfirmModal(prop) {
  const dispatch = useAppDispatch();
  const {isShow, type, title, content, onAction, url, buttonText} = prop.data;

  const handleClose = () => {
    dispatch(modalActions.closeModal({type: type}));
  };

  const handleSubmit = () => {
    onAction();
    dispatch(modalActions.closeModal({type: type}));
  };

  return (
    <Dialog
      open={isShow}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle sx={titleModal}>{title}</DialogTitle>
      <DialogContent sx={contentModal}>
        <DialogContentText sx={{color: '#000', fontSize: '16px'}}>{content}</DialogContentText>
      </DialogContent>
      <DialogActions sx={footerModal}>
        <Button
          variant='outlined'
          startIcon={<CloseCircleOutlined style={{fontSize: '18px'}} />}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          startIcon={<CheckOutlined style={{fontSize: '16px'}} />}
          onClick={handleSubmit}
        >
          {buttonText || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
