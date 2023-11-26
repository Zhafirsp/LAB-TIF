module.exports = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
};
// const isLogin = (token: string | null) => {
//   return token !== null;
// };
// export default isLogin;