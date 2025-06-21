type ActionType = 'create' | 'join' | 'exit' | 'delete';

const getSocialActionMessage = (text: string) => ({
  confirm: (action: ActionType) => {
    const messages = {
      create: `${text}을 생성하시겠습니까?`,
      join: `${text}에 참여하시겠습니까?`,
      exit: `${text}을 나가시겠습니까?`,
      delete: `${text}을 삭제하시겠습니까?`,
    };
    return messages[action];
  },
  success: (action: ActionType) => {
    const messages = {
      create: `${text} 생성에 성공했습니다.`,
      join: `${text} 참여에 성공했습니다.`,
      exit: `${text} 나가기를 성공했습니다.`,
      delete: `${text} 삭제를 성공했습니다.`,
    };
    return messages[action];
  },
  fail: (action: ActionType) => {
    const messages = {
      create: `${text} 생성에 실패했습니다.`,
      join: `${text} 참여에 실패했습니다.`,
      exit: `${text} 나가기를 실패했습니다.`,
      delete: `${text} 삭제를 실패했습니다.`,
    };
    return messages[action];
  },
});
export default getSocialActionMessage;
