import styled from 'styled-components';
import close from '@assets/img/close-line.png';

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Modal = styled.div`
  position: relative;
  width: 79rem;
  height: 35.5rem;
  border: 1px solid ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.white};
  font-weight: lighter;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ababab;
  height: 5rem;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  padding: 1.5rem 3rem;
`;

export const CloseImage = styled.img.attrs({
  src: `${close}`,
})`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  margin-top: 1rem;
  margin-right: 1rem;
`;

export const ModalBody = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

export const ModalFooter = styled.div`
  background: ${props => props.theme.colors.neutral5};
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5rem;
`;
