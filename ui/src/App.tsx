import { useEffect, useState } from "react";

function App() {
  const [apiStatus, setApiStatus] = useState("Checking API...");
  const [deploymentStatus, setDeploymentStatus] = useState("Checking deployment...");
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleString());

    fetch("https://app-api-cicd.azurewebsites.net/api/status")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data) => {
        setApiStatus(`API Version ${data.version} - ${data.message}`);
      })
      .catch(() => {
        setApiStatus("API connection failed");
      });

    fetch("https://app-api-cicd.azurewebsites.net/api/deployment")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Deployment request failed");
        }
        return response.json();
      })
      .then((data) => {
        setDeploymentStatus(
          `${data.status} - ${data.pipeline} - ${data.platform}`
        );
      })
      .catch(() => {
        setDeploymentStatus("Deployment validation failed");
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: "20px",
              background: "#e8f5e9",
              color: "#2e7d32",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            CI/CD Deployment Active
          </div>

          <h1
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              fontSize: "36px",
              color: "#1f2937",
            }}
          >
            Frontend Deployment Test — Release Validation
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "#6b7280",
              lineHeight: "1.6",
            }}
          >
            This UI update validates the complete GitHub Actions deployment
            workflow from source code change to Azure Static Website.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              padding: "24px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#374151" }}>Frontend</h2>

            <p style={{ color: "#2e7d32", fontWeight: "bold" }}>
              ✓ UI Deployment Updated
            </p>

            <p style={{ color: "#6b7280" }}>
              React + Vite
            </p>
          </div>

          <div
            style={{
              padding: "24px",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#374151" }}>Backend API</h2>

            <p style={{ color: "#2e7d32", fontWeight: "bold" }}>
              ✓ {apiStatus}
            </p>

            <p style={{ color: "#6b7280" }}>
              ASP.NET Core .NET 8
            </p>
          </div>
        </div>

        <div
          style={{
            padding: "24px",
            borderRadius: "10px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ marginTop: 0, color: "#374151" }}>
            Deployment Validation
          </h2>

          <p style={{ color: "#475569", lineHeight: "1.6" }}>
            {deploymentStatus}
          </p>

          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Last UI validation: {time}
          </p>
        </div>

        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
          }}
        >
          <strong style={{ color: "#3730a3" }}>
            Latest UI deployment through GitHub Actions
          </strong>

          <p
            style={{
              marginBottom: 0,
              color: "#4f46e5",
              lineHeight: "1.6",
            }}
          >
            Infrastructure: Terraform | Platform: Microsoft Azure |
            Deployment: GitHub Actions
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;