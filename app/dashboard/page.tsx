"use client";

import { useState } from "react";

export default function Dashboard() {
  // Ye dummy data hai UI test karne ke liye (Baad me Firebase se aayega)
  const [members, setMembers] = useState([
    { id: 1, name: "Supriya", status: "Online", lastActive: "Just now", location: "Kalyan Home", device: "Connected" },
    { id: 2, name: "Sunita", status: "Offline", lastActive: "2 hours ago", location: "Home", device: "Disconnected" }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">CareConnect Dashboard</h1>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm shadow-sm">
            📡 Radar Active
          </div>
        </header>

        <div className="grid gap-4">
          {members.map((member) => (
            <div key={member.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${member.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
                  <p className="text-sm text-gray-500">📍 {member.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${member.status === 'Online' ? 'text-green-600' : 'text-gray-500'}`}>
                  {member.status}
                </p>
                <p className="text-xs text-gray-400 mt-1">{member.device}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}