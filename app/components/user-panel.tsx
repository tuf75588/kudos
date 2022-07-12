// app/components/user-panel.tsx
export function UserPanel() {
  return (
    <div className="w-1/6 bg-gray-200 flex flex-col">
      <div className="text-center bg-gray-300 h-20 flex justify-center items-center">
        <h2 className="text-xl text-blue-600 font-semibold">My Team</h2>
      </div>
      <div className="flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10">
        <p>Users go here</p>
      </div>
      <div className="text-center p-6 bg-gray-300">
        <button
          type="submit"
          className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
