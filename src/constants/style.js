import styled from '@emotion/styled';

const STYLE_MODAL = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: 700,
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
};

const BtnAction = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #1890ff;
    color: #ffff;
  }
`;

export {STYLE_MODAL, BtnAction};
