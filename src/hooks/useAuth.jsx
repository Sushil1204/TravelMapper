import Cookies from 'js-cookie';

const useAuth = () => {
    const isAuthenticated = Cookies.get('userData') && JSON.parse(Cookies.get('userData'));
    return { isAuthenticated };
};

export default useAuth;