import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import useSocialActions from '@/app/social/detail/[storyId]/hooks/useSocialActions';
import { APP_ROUTES } from '@/constants/appRoutes';
import { TEAM_USER_ROLE } from '@/types/teamUserRole';

const TEST_STORY_ID = '188040fc-2631-40d9-bcef-b0476f9bfb14';
const TEST_USER_ID = 2222;
const TEST_USER_NAME = 'Admin';

const insertNewCollaborator = jest.fn();
const deleteSocialData = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  '@/hooks/api/supabase/story-collaborators/useParticipateCollaborator',
  () => ({
    __esModule: true,
    default: () => ({
      mutate: insertNewCollaborator,
    }),
  })
);

jest.mock('@/hooks/api/supabase/useDeleteSocialByDb', () => ({
  __esModule: true,
  default: () => ({
    mutate: deleteSocialData,
  }),
}));

global.alert = jest.fn();
global.confirm = jest.fn();

describe('useSocialActions 훅의 조건 분기 테스트', () => {
  const routerPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPush });
  });

  const defaultParams = {
    storyId: TEST_STORY_ID,
    userId: TEST_USER_ID,
    userName: TEST_USER_NAME,
  };

  it('로그인하지 않은 사용자는 alert와 함께 로그인 페이지로 라우트 전환됨', () => {
    const { result } = renderHook(() =>
      useSocialActions({
        storyId: TEST_STORY_ID,
        userId: undefined,
        userName: undefined,
      })
    );

    act(() => {
      result.current.navigateStoryOrJoinSocial('GUEST');
    });

    expect(global.alert).toHaveBeenCalledWith('로그인이 필요한 서비스입니다.');
    expect(routerPush).toHaveBeenCalledWith(`${APP_ROUTES.signin}`);
  });

  it('로그인된 GUEST가 모임 참여 confirm에 확인을 할 경우 insertNewCollaborator 호출됨', () => {
    (global.confirm as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useSocialActions(defaultParams));

    act(() => {
      result.current.navigateStoryOrJoinSocial('GUEST');
    });

    expect(insertNewCollaborator).toHaveBeenCalledWith({
      data: {
        story_id: TEST_STORY_ID,
        user_id: TEST_USER_ID!,
        user_name: TEST_USER_NAME!,
        joined_at: expect.any(String),
      },
      role: TEAM_USER_ROLE.MEMBER,
    });
  });

  it('로그인된 GUEST가 모임 참여 confirm을 취소할 경우 insertNewCollaborator는 호출되지 않음', () => {
    (global.confirm as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useSocialActions(defaultParams));

    act(() => {
      result.current.navigateStoryOrJoinSocial('GUEST');
    });

    expect(insertNewCollaborator).not.toHaveBeenCalled();
  });

  it('MEMBER는 스토리 상세 페이지로 라우트 전환됨', () => {
    const { result } = renderHook(() => useSocialActions(defaultParams));

    act(() => {
      result.current.navigateStoryOrJoinSocial('MEMBER');
    });

    expect(routerPush).toHaveBeenCalledWith(
      `${APP_ROUTES.libraryDetail}/${TEST_STORY_ID}/?page=0`
    );
  });

  it('LEADER가 모임 삭제 confirm에 확인할 경우 deleteSocialData가 호출되고, 홈 페이지로 라우트 전환됨', () => {
    (global.confirm as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useSocialActions(defaultParams));

    act(() => {
      result.current.deleteSocial('LEADER');
    });

    expect(deleteSocialData).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalledWith(`${APP_ROUTES.home}`);
  });

  it('LEADER가 모임 삭제 confirm을 취소할 경우 아무것도 실행되지 않음', () => {
    (global.confirm as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useSocialActions(defaultParams));

    act(() => {
      result.current.deleteSocial('LEADER');
    });

    expect(deleteSocialData).not.toHaveBeenCalled();
    expect(routerPush).not.toHaveBeenCalledWith(`${APP_ROUTES.home}`);
  });

  it('GUEST가 deleteSocial을 호출하면 아무것도 실행되지 않음', () => {
    const { result } = renderHook(() => useSocialActions(defaultParams));

    act(() => {
      result.current.deleteSocial('GUEST');
    });

    expect(deleteSocialData).not.toHaveBeenCalled();
    expect(routerPush).not.toHaveBeenCalled();
  });

  it('MEMBER가 deleteSocial을 호출하면 아무것도 실행되지 않음', () => {
    const { result } = renderHook(() => useSocialActions(defaultParams));

    act(() => {
      result.current.deleteSocial('MEMBER');
    });

    expect(deleteSocialData).not.toHaveBeenCalled();
    expect(routerPush).not.toHaveBeenCalled();
  });
});
