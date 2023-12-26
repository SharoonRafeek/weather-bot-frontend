import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./hooks/useStore";
import Admin from "./components/Admin.jsx";

function App() {
  const setAuthData = useStore((state) => state.setAuthData);
  return (
    <div className="App">
      {!useStore((state) => state.authData) ? (
        <>
          <h1>Sign In</h1>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_CLIENT_ID}
          >
            <GoogleLogin
              useOneTap={true}
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                const { data } = await axios.post(
                  import.meta.env.VITE_BACKEND_URL,
                  {
                    token: credentialResponse.credential,
                  }
                );
                localStorage.setItem("AuthData", JSON.stringify(data));
                setAuthData(data);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </>
      ) : (
        <>
          <Admin />
        </>
      )
      }
    </div >
  );
}

export default App;