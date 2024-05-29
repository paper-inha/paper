import React, { useState } from 'react';

function EmailDuplicateModal ({ closeModal }) {
  const [email, setEmail] = useState('');

  /*const handleEmailDuplicateConfirm = async () => {
    try {
      // 이메일 중복 확인 API 호출
      if (response.data.isDuplicate) {
        // 이메일 중복 발생
        alert('이메일이 중복되었습니다.');
      } else {
        // 이메일 중복 없음
        // 이메일 중복 체크 완료 처리
        onConfirm();
      }
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };*/

  return (
    <div>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>중복 확인</button>
        <span onClick={closeModal}>취소</span>
      </div>
  );
};

export default EmailDuplicateModal;
