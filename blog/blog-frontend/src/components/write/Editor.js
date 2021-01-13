import React, {useRef, useEffect} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
    /* 페이지 위아래 여백 지정*/
    padding-top:5rem;
    padding-bottom:5rem; 
`;
const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom:0.5rem;
    border:none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom:2rem;
    width:100%;
`;

const QuillWrapper = styled.div`
    /* 최소 크기 지정 및 padding 제거*/
    .ql-editor{
        padding:0;
        min-height:320px;
        font-size:1.125rem;
        line-height:1.5;
    }
    .ql-editor.ql-blank::before{
        left:0px;
    }
`;

const Editor = ({title, body, onChangeField}) =>{
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(()=>{
        quillInstance.current = new Quill(quillElement.current,{
            theme:'bubble',
            placeholder:'내용을 작성해 주세요.',
            modules:{
                //https:/quilljs.com/docs/modules/toolbar 참고
                toolbar:[
                    [{header:'1'},{header:'2'}],
                    ['bold','italic','underline','stlike'],
                    [{list:'ordered'},{list:'bullet'}], 
                    ['blockquote','code-block','link','image']
                ],
            },
        });
        //quill에 text-change 이벤트 핸들러 등록
        //quill ref = https://quilljs.com/docs/api/#events
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) =>{
            if(source === 'user'){
                onChangeField({key:'body', value:quill.root.innerHTML})
            }
        });
    },[onChangeField]);

    const mounted = useRef(false);
    //UPDATE로 넘어온 경우 해당 부분은 한번만 mount 되어야 하기 때문에 추적에 body를 빼도 되지만 권장사항임으로 useRef를 사용하여 변수 mounted를 만들고 해당 값에 따라 useEffect되도록 함
    useEffect(()=>{
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    },[body]);
    const onChangeTitle = (e) =>{
        onChangeField({key:'title', value:e.target.value});
    };

    return(
        <EditorBlock>
            <TitleInput placeholder='제목을 입력하세요' onChange={onChangeTitle} value={title}></TitleInput>
            <QuillWrapper>
                <div ref={quillElement}></div>
            </QuillWrapper>
        </EditorBlock>
    );
}

export default Editor;