import {API} from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await API()('v1/auth/logout', {
                credentials: "include",
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout