import styled from 'styled-components';

function Home() {
    return (
        <Container>
            강의시간표/수업계획서조회
        </Container>
    );
}

const Container = styled.div`
    ${props=>props.theme.texts.title};
`;

export default Home;