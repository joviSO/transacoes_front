import { Route, useNavigate } from 'react-router-dom';

export function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return (
      <Route>
        <Component {...props} navigate={navigate} />
      </Route>
    );
  };
}