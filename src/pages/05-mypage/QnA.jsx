import React, { useState } from 'react';
import Down_black from '../../component/icons/Down_black';
import Up_gray from '../../component/icons/Up_gray';
import "../../styles/05-mypage/qna.scss";

function QnA() {
  const [openStates, setOpenStates] = useState([false, false, false, false, false]);

  const qnaData = [
    {
      id: 1,
      question: '떠나봅서는 무슨 뜻인가요?',
      answer: '떠나봅서는 표준어로 떠나 봅시다 혹은 출발 합시다라는 뜻으로<br />여행을 떠나자는 의미 입니다.'
    },
    {
      id: 2,
      question: '떠나봅서는 어떤 서비스 인가요?',
      answer: '제주 여행에 대해 정보를 제공하고<br />여행 계획을 구성할 수 있는 서비스입니다.'
    },
    {
      id: 3,
      question: '추천 일정은 최대 몇박까지 가능한가요?',
      answer: '추천 일정에서는 최대 5박 6일까지 가능합니다.'
    },
    {
      id: 4,
      question: '게시글/댓글을 신고하고 싶어요',
      answer: '고객센터 문의 주시면 빠른 답변 드리겠습니다.<br />고객센터 1588-0000.'
    },
    {
      id: 5,
      question: '내 게시글 수정,삭제는 어떻게 하나요?',
      answer: '->[마이페이지 -> 좋아요 -> 게시물 탭]으로 가서<br />수정 및 삭제하고 싶은 게시물을 선택후,상단에 수정 및 삭제 버튼을 클릭하여 사용하시면 됩니다.'
    }
  ];

  const toggleQuestion = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStates(newOpenStates);
  };

  return (
    <div className="qna-container">
      <div className="qna-subtitle"><b>자주 묻는 질문</b></div>
      {qnaData.map((item, index) => (
        <div key={item.id} className={`qna-item ${openStates[index] ? 'open' : ''}`}>
          <div className="qna-question" onClick={() => toggleQuestion(index)}>
            <p>{item.question}</p>
            <div className="arrow-icon">
              {openStates[index] ? <Up_gray className="icon" /> : <Down_black className="icon" />}
            </div>
          </div>
          {openStates[index] && (
            <div className="qna-answer">
              <p dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          )}
          {index < qnaData.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}

export default QnA;
