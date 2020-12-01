import React, { useCallback } from 'react';
// import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { increase, decrease } from '../modules/counter';
import Counter from '../components/Counter';

// const CounterContainers = ({ number, increase, decrease }) => {
//   return (
//     <Counter
//       number={number}
//       onIncrease={increase}
//       onDecrease={decrease}
//     ></Counter>
//   );
// };

// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ increase, decrease }, dispatch);

// const makeConnector = connect(mapStateToProps, mapDispatchToProps);
// export default makeConnector(CounterContainers);

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <Counter
      number={number}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    ></Counter>
  );
};

export default CounterContainer;