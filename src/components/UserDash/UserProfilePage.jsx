import { UserProfile } from "@clerk/clerk-react";

const UserProfilePage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <UserProfile />
      </div>
    </div>
  );
};

export default UserProfilePage;
