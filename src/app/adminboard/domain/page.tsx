"use client";

import { useEffect, useState } from "react";

interface Domain {
  name: string;
  verified: boolean;
  verification?: { type: string; domain: string; value: string }[];
}

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/adminboard/domain/get-all")
      .then((res) => res.json())
      .then((data) => {
        setDomains(data.domains || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connected Domains</h1>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Domain</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Instructions</th>
          </tr>
        </thead>
        <tbody>
          {domains.map((d) => (
            <tr key={d.name} className="border-t">
              <td className="p-2">{d.name}</td>
              <td className="p-2">
                {d.verified ? (
                  <span className="text-green-600 font-medium">✅ Verified</span>
                ) : (
                  <span className="text-red-600 font-medium">❌ Not Verified</span>
                )}
              </td>
              <td className="p-2 text-sm">
                {!d.verified && d.verification ? (
                  <ul>
                    {d.verification.map((v, i) => (
                      <li key={i}>
                        {v.type}: <code>{v.domain}</code> →{" "}
                        <code>{v.value}</code>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
