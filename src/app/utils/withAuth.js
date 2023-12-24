import { useSelector } from 'react-redux';
import { EmptyList } from '../components/Exception/EmptyList';

const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const { userData } = useSelector((state) => state.userReducer);


        return userData ? <Component {...props} /> : <EmptyList text={"Login to explore"} />;
    };
    return AuthenticatedComponent;
};

export default withAuth;
