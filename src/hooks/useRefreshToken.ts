import axios from '../api/axiosClient';

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    return response.data;
  };
  return refresh;
};

export default useRefreshToken;
