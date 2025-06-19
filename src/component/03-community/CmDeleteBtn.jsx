import React from "react";

function CmDeleteBtn({ onClick }) {
  return (
    <button className="cm-delete-btn" onClick={onClick}>
      삭제하기
    </button>
  );
}

export default CmDeleteBtn;