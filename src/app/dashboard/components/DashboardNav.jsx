export default function DashboardNav({ view, setView }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <h1 className="text-2xl font-bold">
        {view === "dashboard" ? "Dashboard" : "Account Settings"}
      </h1>
      <button
        onClick={() => setView(view === "dashboard" ? "account" : "dashboard")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {view === "dashboard" ? "Go to Account" : "Back to Dashboard"}
      </button>
    </div>
  );
}
