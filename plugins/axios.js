export default function({ $axios, redirect }) {
  // Adds header: `Authorization: Bearer 123` to all requests
  $axios.setToken(localStorage.getItem("admintoken"), "Bearer");

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      window.location = "/kcadmin/login";
    }
  });
}
