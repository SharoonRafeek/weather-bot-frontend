import { useStore } from "../hooks/useStore";
import { googleLogout } from "@react-oauth/google";

const Admin = () => {
  const { authData, setAuthData } = useStore();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-lg font-bold">Weather-bot</h1>
        </div>

        {authData && (
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-white text-sm">{authData.data.name}</h1>
              <p className="text-gray-300 text-xs">{authData.data.email}</p>
            </div>
            <img
              className="w-8 h-8 rounded-full"
              src={authData.data.image}
              alt="profile"
            />

            <button
              onClick={() => {
                googleLogout();
                localStorage.removeItem("AuthData");
                setAuthData(null);
                window.location.reload();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Admin;
