import { useState } from "react";

export default function DocumentChamber() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("Draft");

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Document Processing Chamber</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      {file && (
        <div className="border p-4 rounded bg-gray-100 mb-4">
          <p>📄 {file.name}</p>
          <iframe
            src={URL.createObjectURL(file)}
            className="w-full h-[400px] mt-2"
          ></iframe>
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={() => setStatus("In Review")}
          className="bg-yellow-500 px-4 py-2 rounded text-white"
        >
          Mark In Review
        </button>
        <button
          onClick={() => setStatus("Signed")}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Mark Signed
        </button>
      </div>

      <p className="mt-4 font-semibold">Status: {status}</p>
    </div>
  );
}
