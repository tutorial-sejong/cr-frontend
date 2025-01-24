import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {getMacroCode} from '@apis/api/course.ts';
import {useDispatch} from 'react-redux';
import {
  openModalHandler,
  closeHandler,
} from '@components/common/Modal/handlers/handler.tsx';
import {
  CloseImage,
  Modal,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  Title,
} from '@/styles/ModalLayout';

interface MacroTypes {
  url: string;
  answer: number;
}

function AntiMacroCodeModal() {
  const [macroCode, setMacroCode] = useState<MacroTypes>({
    url: '',
    answer: 0,
  });
  const [inputCode, setInputCode] = useState<number | string>();
  const [imageSrc, setImageSrc] = useState<string>('');

  const dispatch = useDispatch();

  const fetchMacroCode = async () => {
    try {
      const {data} = await getMacroCode();
      setMacroCode(prev => ({
        ...prev,
        url: data.url,
        answer: data.answer,
      }));
      setImageSrc(data.url);
    } catch (error) {
      console.error('매크로 코드 불러오기 실패: ', error);
    }
  };

  const checkCode = () => {
    if (inputCode === macroCode.answer) {
      setInputCode('');
      openModalHandler(dispatch, 'check');
      return;
    }

    alert('코드가 일치하지 않습니다.');
    fetchMacroCode();
    setInputCode('');
  };

  const closeButton = () => {
    closeHandler(dispatch);
  };

  useEffect(() => {
    fetchMacroCode();
  }, []);

  return (
    <ModalContainer>
      <MacroModal>
        <ModalHeader>
          <Title>매크로방지 코드입력 (Anti-macro code input) </Title>
          <CloseImage onClick={closeButton} />
        </ModalHeader>
        <ModalBody>
          <MacroCodeBox>
            <MacroCodHeader>
              <BoxTitle>생성된 코드</BoxTitle>
              <RegenerateCodeButton onClick={fetchMacroCode}>
                재생성
              </RegenerateCodeButton>
            </MacroCodHeader>
            {imageSrc && <MacroCodeImage src={imageSrc} />}
          </MacroCodeBox>
          <MacroCodeInputBox>
            <MacroCodHeader>
              <BoxTitle>생성된 코드 입력</BoxTitle>
            </MacroCodHeader>
            <MacroCodeInput
              type='number'
              value={inputCode || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputCode(e.target.value);
              }}
            />
          </MacroCodeInputBox>
        </ModalBody>
        <InfoMessage>
          ※ 코드가 표시되지 않는 경우 잠시 기다리거나 매크로방지 코드 입력 창을
          닫고 새로 열어주세요.
        </InfoMessage>
        <ModalFooter>
          <FooterBtn style={{marginRight: '10px'}} onClick={checkCode}>
            코드입력
          </FooterBtn>
          <FooterBtn style={{marginRight: '20px'}} onClick={closeButton}>
            닫기
          </FooterBtn>
        </ModalFooter>
      </MacroModal>
    </ModalContainer>
  );
}

const MacroModal = styled(Modal)`
  width: 50rem;
  height: 31.25rem;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MacroCodeBox = styled.div`
  margin-left: 1rem;
`;

const BoxTitle = styled.p`
  border-left: 4px solid ${props => props.theme.colors.primary};
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  padding-left: 0.5rem;
`;

const MacroCodeInputBox = styled.div`
  margin-right: 10px;
`;

const MacroCodHeader = styled.div`
  height: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
`;

const RegenerateCodeButton = styled.div`
  background: ${props => props.theme.colors.primary};
  color: #ffffff;
  border-radius: 3px;
  font-size: 1.4rem;
  padding: 8px 15px;
  text-align: center;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    background: #a4223d;
  }
`;

const MacroCodeImage = styled.img`
  margin-top: 10px;
  width: 120px;
`;

const MacroCodeInput = styled.input`
  width: 200px;
  border: 1px solid #858181;
  border-radius: 0;
  font-size: 1.3rem;
  padding: 6px 8px;
  margin-top: 10px;
`;

const InfoMessage = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  position: absolute;
  bottom: 60px;
  margin: 0 10px;
`;

const FooterBtn = styled.div`
  font-size: 1.4rem;
  border: 1px solid #000000;
  background: #ffffff;
  padding: 6px 15px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;

export default AntiMacroCodeModal;
