//액션 타입선언
// 뒤에 as const를 붙여 줌으로써 나중에 액션 객체를 만들게 action type의 값을 추론하는 과정에서
// action.type 이 string으로 추론되지 않고 counter/INCREASE 와 같이 문자열 값으로 추론되도록
const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

//액션 생성 함수 선언
export const increase = () => ({
	type: INCREASE,
});

export const decrease = () => ({
	type: DECREASE,
});

export const increaseBy = (diff: number) => ({
	//액션에 부가적으로 필요한 값을 payload로 통일
	type: INCREASE_BY,
	payload: diff,
});

// 모든 액션 객체들에 대한 타입 선언
type CounterAction =
	| ReturnType<typeof increase>
	| ReturnType<typeof decrease>
	| ReturnType<typeof increaseBy>;

//이 리덕스 모듈애소 관리 할 상태의 타입 선언
type CounterState = {
	count: number;
};

// 초기상태 선언.
const initialState: CounterState = {
	count: 0,
};

//리듀서 작성
//리듀서에서는 state와 함수의 반환값이 일치하도록 작성한다.
//액션에서는 방금 생성한 CounterAction을 타입으로 설정한다.

function counter(state: CounterState = initialState, action: CounterAction) {
	switch (action.type) {
		case INCREASE:
			return { count: state.count + 1 };
		case DECREASE:
			return { count: state.count - 1 };
		case INCREASE_BY:
			return { count: state.count + action.payload };
		default:
			return state;
	}
}

export default counter;
