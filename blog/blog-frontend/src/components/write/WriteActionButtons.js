import React from 'react';
import styled from 'styled-components';
import Button from '../common/ButtonCommon';

const WriteActionButtonBlock = styled.div`
    margin-top:1rem;
    margin-bottom:3rem;
    display:flex;
    button + button {
        margin-left:0.5rem;
    }
`;

const StyledButton = styled(Button)`
    height:3rem;
    width:200px;
    & + &{
        margin-left:0.5rem;
    }
`;

const WirteActionButtons = ({onCancel, onPublish}) => {
    return (
        <WriteActionButtonBlock>
            <StyledButton onClick={onPublish}>포스트 등록</StyledButton>
            <StyledButton onClick={onCancel}>등록 취소</StyledButton>
        </WriteActionButtonBlock>
    );
}

export default WirteActionButtons;