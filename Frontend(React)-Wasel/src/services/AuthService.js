import jwtDecode from "jwt-decode";

const tokenKey = "authKey";

export function setJwt(token) {
  localStorage.setItem(tokenKey, token);
}

// export function getJwt() {
//   return localStorage.getItem(tokenKey);
// }

export function getUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (ex) {
    console.log(ex);
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
