import { useState } from "react";

export default function VideoCall() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">Video Call Section</h2>

      <div className="border rounded-lg w-[600px] h-[400px] bg-black flex items-center justify-center text-white">
        {inCall ? "Live Video Stream (Mock)" : "No Active Call"}
      </div>

      <div className="mt-4 flex space-x-2">
        {!inCall ? (
          <button
            onClick={() => setInCall(true)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={() => setInCall(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            End Call
          </button>
        )}

        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          🎤 Toggle Audio
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          🎥 Toggle Video
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          🖥 Screen Share
        </button>
      </div>
    </div>
  );
}
