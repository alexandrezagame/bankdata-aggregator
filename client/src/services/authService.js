module.exports.getAccessToken = async (code) => {
  try {
    const response = await fetch(`http://localhost:8080/api/auth/${code}`);
    if (!response.ok) throw await response.json();
    const { access_token, refresh_token } = await response.json();

    sessionStorage.setItem('access_token', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    return access_token;
  } catch (error) {
    return null;
  }
};

module.exports.getAccessTokenFromRefresh = async () => {
  try {
    const token = localStorage.getItem('refreshToken');
    if (!token) return null;
    const response = await fetch(
      `http://localhost:8080/api/auth/refresh/${token}`
    );
    if (!response.ok) throw await response.json();
    const { access_token, refresh_token } = await response.json();
    sessionStorage.setItem('access_token', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    return access_token;
  } catch (error) {
    return null;
  }
};
