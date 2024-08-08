import React from 'react';
import styled from 'styled-components';
import logo from '@assets/img/tutorial_sejong_logo.webp';
const MaintenancePage: React.FC = () => {
  return (
    <Container>
      <Logo src={logo}/>
      <Title>사이트 리뉴얼 중입니다!</Title>
      <Message>2024년 8월 7일 16:25 ~ 2024년 8월 8일 23:59</Message>
      <Message>이용에 불편을 드려 죄송합니다.</Message>
      <Message>문의사항이 있으시면 <ContactLink href="mailto:support@example.com">tutorialsejong@gmail.com</ContactLink>으로 연락
        주세요.</Message>
    </Container>
  );
};


const Container = styled.div`
    text-align: center;
    padding: 50px;
    font-family: 'Arial', sans-serif;
`;

const Logo = styled.img`
    width: 300px;
`;

const Title = styled.h1`
    font-size: 3rem;
    color: #333;
`;

const Message = styled.p`
    color: #666;
    margin: 20px auto;
    font-size: 18px;
`;

const ContactLink = styled.a`
    color: #0077cc;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export default MaintenancePage;
