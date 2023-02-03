import {modalActions} from 'store/modal/modalSlice';
export const handleUnderConstruction = (dispatch) => {
  const params = {
    type: 'modalUnderConstruction',
    title: 'Under construction',
    content: <span>This function is finalizing, please come back later</span>,
  };
  dispatch(modalActions.showModal(params));
};
