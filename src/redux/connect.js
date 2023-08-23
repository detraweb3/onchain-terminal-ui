import { connect } from 'react-redux';
import { setUserData } from './actions';

const mapStateToPropsAll = (state) => ({
  userData: state.userData,
});

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  setUserData,
};

const mapDispatchToPropsAll = {
  setUserData,
};

const connectUserDataRedux = connect(mapStateToProps, mapDispatchToProps);
const connectAllRedux = connect(mapStateToPropsAll, mapDispatchToPropsAll);

const connectRedux = {connectUserDataRedux, connectAllRedux};
export default connectRedux
