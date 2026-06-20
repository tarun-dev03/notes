export default function PinnedNotes() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border mt-4 mb-4" >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          📌 Pinned Notes
        </h2>

        <button className="text-blue-500 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-xl border">
          <h3 className="font-medium">
            DSA Revision Notes
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Arrays, Linked Lists, Stack, Queue...
          </p>
        </div>

        <div className="p-4 rounded-xl border">
          <h3 className="font-medium">
            Spring Boot Cheat Sheet
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Annotations, Starters, Configurations...
          </p>
        </div>
      </div>
    </div>
  );
}