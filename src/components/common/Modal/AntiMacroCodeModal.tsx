import styled from 'styled-components';
import close from '@assets/img/tab_close_all.png';
import {useEffect, useState} from 'react';
import {getMacroCode} from '@apis/api/course.ts';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;

interface MacroTypes {
  url: string,
  answer: number;
}

function AntiMacroCodeModal() {

  const [macroCode, setMacroCode] = useState<MacroTypes>({
    url: '',
    answer: 0,
  });

  const [inputCode, setInputCode] = useState<number>();

  const fetchMacroCode = async () => {
    try {
      const {data} = await getMacroCode();

      setMacroCode(prev => ({
        ...prev,
        url: `https://api.tutorial-sejong.com${data.url}`,
        answer: data.answer,
      }));

    } catch (error) {
      console.error('매크로 코드 불러오기 실패: ', error);
    }
  };

  const checkCode = () => {
    if (inputCode === macroCode.answer) {
      alert('통과');
      setInputCode('');
      return;
    }
    alert('실패');
    setInputCode('');
  };

  useEffect(() => {
    fetchMacroCode();
  }, []);

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <Title>매크로방지 코드입력 (Anti-macro code input) </Title>
          <CloseImage />
        </ModalHeader>
        <ModalBody>
          <MacroCodeBox>
            <MacroCodHeader>
              <BoxTitle>생성된 코드</BoxTitle>
              <RegenerateCodeButton onClick={fetchMacroCode}>재생성</RegenerateCodeButton>
            </MacroCodHeader>
            <MacroCodeImage src={macroCode.url} />
          </MacroCodeBox>
          <MacroCodeInputBox>
            <MacroCodHeader>
              <BoxTitle>생성된 코드 입력</BoxTitle>
            </MacroCodHeader>
            <MacroCodeInput type="number" value={inputCode || ''} onChange={e => setInputCode(e.target.value)} />
          </MacroCodeInputBox>
        </ModalBody>
        <InfoMessage>※ 코드가 표시되지 않는 경우 잠시 기다리거나 매크로방지 코드 입력 창을 닫고 새로 열어주세요.</InfoMessage>
        <ModalFooter>
          <FooterBtn style={{marginRight: '10px'}} onClick={checkCode}>코드입력</FooterBtn>
          <FooterBtn style={{marginRight: '20px'}}>닫기</FooterBtn>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;

const Modal = styled.div`
    position: relative;
    width: 500px;
    height: 312.5px;
    border: 1px solid #000000;
    background: #ffffff;
    font-weight: lighter;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ababab;
`;

const Title = styled.div`
    font-size: 2rem;
    font-weight: bolder;
    padding: 15px 30px;
`;

const CloseImage = styled.img.attrs({
  src: `${close}`,
})`
    display: block;
    width: 18px;
    height: 17px;
    cursor: pointer;
    margin-top: 15px;
    margin-right: 10px;
`;

const ModalBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const MacroCodeBox = styled.div`
    margin-left: 10px;
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
    margin-left: 10px;
`;
const ModalFooter = styled.div`
    background: ${props => props.theme.colors.neutral5};
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
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