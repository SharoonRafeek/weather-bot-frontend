import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./hooks/useStore";
import Users from "./components/Users";

function App() {
  const setAuthData = useStore((state) => state.setAuthData);
  return (
    <div className="App">
      {!useStore((state) => state.authData) ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Sign In
            </h1>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
              <GoogleLogin
                useOneTap={true}
                onSuccess={async (credentialResponse) => {
                  console.log(credentialResponse);
                  try {
                    const { data } = await axios.post(
                      import.meta.env.VITE_BACKEND_URL + "/login",
                      {
                        token: credentialResponse.credential,
                      }
                    );
                    localStorage.setItem("AuthData", JSON.stringify(data));
                    setAuthData(data);
                  } catch (error) {
                    console.error('Login failed:', error);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer w-full"
              >
                Sign in with Google
              </GoogleLogin>
            </GoogleOAuthProvider>
          </div>
        </div>
      ) : (
        <>
          <Users />
        </>
      )
      }
    </div >
  );
}

export default App;