// QnA.jsx
import React, { useState } from 'react';
import Down_black from '../../component/icons/Down_black';
import Up_black from '../../component/icons/Up_black';
import '../../styles/05-mypage/qna.scss';

function QnA() {
  const [openIndex, setOpenIndex] = useState(null);

  const qnaData = [
    {
      id: 1,
      question: '떠나봅서는 무슨 뜻인가요?',
      answer:
        "떠나봅서는 표준어로 '떠나 봅시다' 혹은 '출발 합시다' 라는 뜻으로<br />여행을 떠나자는 의미 입니다.",
    },
    {
      id: 2,
      question: '떠나봅서는 어떤 서비스 인가요?',
      answer:
        '제주 여행에 대해 정보를 제공하고<br />여행 계획을 구성할 수 있는 서비스 입니다.',
    },
    {
      id: 3,
      question: '추천 일정은 최대 몇 박까지 가능한가요?',
      answer: '추천 일정에서는 최대 5박 6일까지 가능 합니다.',
    },
    {
      id: 4,
      question: '게시글/댓글을 신고하고 싶어요',
      answer:
        '고객센에 문의 주시면 빠른 답변 드리겠습니다.<br />고객센터 1588-0000.',
    },
    {
      id: 5,
      question: '내 게시글 수정,삭제는 어떻게 하나요?',
      answer:
        '[마이페이지 -> 좋아요 -> 게시물 탭] 으로 가서<br />수정 및 삭제하고 싶은 게시물을 선택 후, 상단에 수정 및 삭제 버튼을 클릭하여 사용하시면 됩니다.',
    },
    {
      id: 6,
      question: '기록용으로 적어두고 싶은데 지난 일정을 저장할 수 있나요?',
      answer:
        '오늘 이후의 날부터 저장이 가능합니다.',
    },
    {
      id: 7,
      question: '추천 일정을 내 스타일대로 바꿀 수 있나요?',
      answer:
        '추천 일정을 내 일정으로 가져온 후, 수정이 가능합니다.',
    },
  {
    id: 8,
      question: '현재 제주 날씨를 볼 수 있나요?',
      answer:
        '메인 화면에서는 오늘 제주 날씨 확인이 가능하고, 내 여행에서는 오늘부터 최대 10일까지 날씨를 확인할 수 있습니다.',
  },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (  
    <div className="qna-container">
      <div className="qna-subtitle">
        <b>자주 묻는 질문</b>
      </div>
      {qnaData.map((item, index) => (
        <div
          key={item.id}
          className={`qna-item ${openIndex === index ? 'open' : ''}`}
        >
          <div
            className="qna-question"
            onClick={() => toggleQuestion(index)}
          >
            <p>{item.question}</p>
            <div className={`arrow-icon ${openIndex === index ? 'active' : ''}`}>
              {openIndex === index ? <Up_black className="icon" /> : <Down_black className="icon" />}
            </div>
          </div>
          {openIndex === index && (
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
