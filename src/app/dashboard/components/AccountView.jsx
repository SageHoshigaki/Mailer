import { UserProfile } from "@clerk/nextjs";

export default function AccountView() {
  return (
    <div>
      <h2 className="text-xl font-bold">Account Settings</h2>
      <UserProfile />
    </div>
  );
}
