import { useStore } from "../hooks/useStore";
import { googleLogout } from "@react-oauth/google";
const Admin = () => {
  const { authData, setAuthData } = useStore();
  return (
    <div className={"container"}>
      {authData && (
        <>
          <h1>{authData.data.name}</h1>
          <p>{authData.data.email}</p>
          <img src={authData.data.image} alt="profile" />

          <button
            onClick={() => {
              googleLogout();
              localStorage.removeItem("AuthData");
              setAuthData(null);
              window.location.reload();
            }}
            className={"button"}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Admin;
