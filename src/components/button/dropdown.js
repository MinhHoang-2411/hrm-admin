import {Button, ButtonGroup, Popper, Grow, Paper, ClickAwayListener, Box} from '@mui/material';
import {useRef, useState} from 'react';
import {CaretDownFilled} from '@ant-design/icons';

export default function DropdownBtn({title = '', content = null}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const widthBtn = anchorRef?.current?.clientWidth
    ? `${anchorRef?.current?.clientWidth}px`
    : 'unset';

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant='contained' ref={anchorRef} aria-label='split button'>
        <Button
          size='medium'
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          endIcon={<CaretDownFilled />}
          onClick={handleToggle}
        >
          {title}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
          width: widthBtn,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>{content}</Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
