import React, {useState, useCallback, Fragment}from 'react';
import styled from 'styled-components';
import qs from 'qs';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AsKRemoveModal';


const PostActionButtonBlock = styled.div`
    display:flex;
    justify-content:flex-end;
    margin-bottom:2rem;
    margin-top:-1.5rem;
`;

const ActionButton = styled.button`
    padding: 0.25rem 0.5rem;
    border-radius:4px;
    color:${palette.gray[6]};
    font-weight:bold;
    border:none;
    outline:none;
    font-size:0.875rem;
    &:hover{
        background:${palette.gray[1]};
        color:${palette.cyan[7]};
    }
    & + &{
        margin-left:0.5rem;
    }
`;

const PostActionButtons = ({onEdit, onRemove}) =>{
    const [modal, setModal] = useState(false);
    const onRemoveClick = ()=> {
        setModal(true);
    }
    const onCancel = () => {
        setModal(false);
    }
    const onConfirm = () =>{
        setModal(false);
        onRemove();
    }
    // useCallback(()=>{},[modal])
    return(
        <Fragment>
            <PostActionButtonBlock>
                <ActionButton onClick={onEdit}>UPDATE</ActionButton>
                <ActionButton onClick={onRemoveClick}>DELETE</ActionButton>
            </PostActionButtonBlock>
            <AskRemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel}></AskRemoveModal>
        </Fragment>

    );
}

export default PostActionButtons;
