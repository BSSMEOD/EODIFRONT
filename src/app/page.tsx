'use client';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  background: white;
  color: #ff9a9e;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #ffecec;
    transform: scale(1.05);
  }
`;

const textStyle = css`
  font-size: 1rem;
  color: white;
  margin-top: 10px;
`;

const TestPage = () => {
  return (
    <Wrapper>
      <Title></Title>
      <p>테스트 페이지</p>
      <Button> 망가진 세상</Button>
    </Wrapper>
  );
};

export default TestPage;
