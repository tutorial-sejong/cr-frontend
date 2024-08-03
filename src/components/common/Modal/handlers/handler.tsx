import {Dispatch} from 'redux';
import {clearModalInfo, setModalName} from '@store/modalSlice';

export const closeHandler = (dispatch: Dispatch) => {
  dispatch(clearModalInfo());
};

export const openModalHandler = (dispatch: Dispatch, name: string) => {
  dispatch(setModalName(name));
};