import { useEffect, useState } from "react";

const API_BASE_URL = "https://app-api-cicd.azurewebsites.net";

type ApiResponse = {
  status?: string;
  service?: string;
  version?: string;
  release?: string;
  message?: string;
  pipeline?: string;
  infrastructure?: string;
  platform?: string;
  timestamp?: string;
  [key: string]: unknown;
};

type WeatherForecast = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
};

function App() {
  const [rootData, setRootData] = useState<ApiResponse | null>(null);
  const [statusData, setStatusData] = useState<ApiResponse | null>(null);
  const [deploymentData, setDeploymentData] =
    useState<ApiResponse | null>(null);
  const [healthData, setHealthData] = useState<ApiResponse | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApiData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        rootResponse,
        statusResponse,
        deploymentResponse,
        healthResponse,
        weatherResponse,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/`),
        fetch(`${API_BASE_URL}/api/status`),
        fetch(`${API_BASE_URL}/api/deployment`),
        fetch(`${API_BASE_URL}/api/health`),
        fetch(`${API_BASE_URL}/weatherforecast`),
      ]);

      if (
        !rootResponse.ok ||
        !statusResponse.ok ||
        !deploymentResponse.ok ||
        !healthResponse.ok ||
        !weatherResponse.ok
      ) {
        throw new Error("One or more API endpoints returned an error.");
      }

      const root = await rootResponse.json();
      const status = await statusResponse.json();
      const deployment = await deploymentResponse.json();
      const health = await healthResponse.json();
      const weather = await weatherResponse.json();

      setRootData(root);
      setStatusData(status);
      setDeploymentData(deployment);
      setHealthData(health);
      setWeatherData(weather);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to the API. Please check the API deployment and network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#111827",
          color: "#ffffff",
          padding: "24px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Release Validation Dashboard</h1>
            <p style={{ margin: "8px 0 0", color: "#d1d5db" }}>
              UI-API-CICD | Azure + Terraform + GitHub Actions
            </p>
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              background: "#065f46",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            ● RELEASE 4 ACTIVE
          </div>
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px",
        }}
      >
        {/* Deployment Summary */}
        <section>
          <h2>Deployment Summary</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <InfoCard
              title="UI Release"
              value="Release 4"
              subtitle="React / Vite"
            />

            <InfoCard
              title="API Release"
              value={statusData?.release || "Loading..."}
              subtitle={statusData?.version || ""}
            />

            <InfoCard
              title="Infrastructure"
              value="Azure"
              subtitle="Managed by Terraform"
            />

            <InfoCard
              title="Pipeline"
              value="GitHub Actions"
              subtitle="CI/CD Automated"
            />
          </div>
        </section>

        {/* API Endpoints */}
        <section style={{ marginTop: "45px" }}>
          <h2>API Endpoints</h2>

          <p style={{ color: "#6b7280" }}>
            Live responses from the deployed .NET 8 API.
          </p>

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                background: "#fee2e2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                color: "#991b1b",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <EndpointCard
              method="GET"
              endpoint="/"
              description="API root and release information"
              loading={loading}
              status={rootData?.status}
              release={rootData?.release}
              message={rootData?.message}
            />

            <EndpointCard
              method="GET"
              endpoint="/api/status"
              description="API deployment status"
              loading={loading}
              status={statusData?.status}
              release={statusData?.release}
              message={statusData?.message}
            />

            <EndpointCard
              method="GET"
              endpoint="/api/deployment"
              description="Deployment validation information"
              loading={loading}
              status={deploymentData?.status}
              release={deploymentData?.release}
              message={deploymentData?.message}
            />

            <EndpointCard
              method="GET"
              endpoint="/api/health"
              description="API health check"
              loading={loading}
              status={healthData?.status}
              release={healthData?.release}
              message="Health endpoint responding successfully"
            />

            <EndpointCard
              method="GET"
              endpoint="/weatherforecast"
              description="Weather forecast API"
              loading={loading}
              status={weatherData.length > 0 ? "Healthy" : undefined}
              release="WeatherForecast"
              message={
                weatherData.length > 0
                  ? `${weatherData.length} forecast records received`
                  : "Loading weather data..."
              }
            />
          </div>
        </section>

        {/* Weather Forecast */}
        <section style={{ marginTop: "45px" }}>
          <h2>Weather Forecast</h2>

          <p style={{ color: "#6b7280" }}>
            Data retrieved from{" "}
            <strong>/weatherforecast</strong>
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            {weatherData.map((weather, index) => (
              <div
                key={index}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ marginTop: 0 }}>
                  {weather.summary}
                </h3>

                <p>
                  <strong>Date:</strong>{" "}
                  {weather.date}
                </p>

                <p>
                  <strong>Temperature:</strong>{" "}
                  {weather.temperatureC}°C
                </p>

                <p>
                  <strong>Fahrenheit:</strong>{" "}
                  {weather.temperatureF}°F
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* API Information */}
        <section style={{ marginTop: "45px" }}>
          <h2>API Information</h2>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              padding: "25px",
            }}
          >
            <p>
              <strong>API URL:</strong>{" "}
              {API_BASE_URL}
            </p>

            <p>
              <strong>Platform:</strong>{" "}
              {rootData?.platform || "Microsoft Azure"}
            </p>

            <p>
              <strong>Infrastructure:</strong>{" "}
              {rootData?.infrastructure || "Terraform"}
            </p>

            <p>
              <strong>Pipeline:</strong>{" "}
              {rootData?.pipeline || "GitHub Actions"}
            </p>

            <p>
              <strong>API Status:</strong>{" "}
              {healthData?.status || "Checking..."}
            </p>

            <p>
              <strong>API Version:</strong>{" "}
              {healthData?.version || "Checking..."}
            </p>
          </div>
        </section>

        {/* Refresh */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={fetchApiData}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "6px",
              background: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Refresh API Data
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: "60px",
          padding: "25px",
          background: "#111827",
          color: "#9ca3af",
          textAlign: "center",
        }}
      >
        UI-API-CICD | Release 4 | Terraform + GitHub Actions + Azure
      </footer>
    </div>
  );
}

function InfoCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "24px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {title}
      </p>

      <h2 style={{ margin: "10px 0 5px" }}>
        {value}
      </h2>

      <p
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function EndpointCard({
  method,
  endpoint,
  description,
  loading,
  status,
  release,
  message,
}: {
  method: string;
  endpoint: string;
  description: string;
  loading: boolean;
  status?: string;
  release?: string;
  message?: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "22px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <span
          style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "5px 9px",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {method}
        </span>

        <code
          style={{
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          {endpoint}
        </code>
      </div>

      <p
        style={{
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {description}
      </p>

      {loading ? (
        <p>Checking endpoint...</p>
      ) : (
        <>
          <p>
            <strong>Status:</strong>{" "}
            {status || "Unavailable"}
          </p>

          <p>
            <strong>Release:</strong>{" "}
            {release || "N/A"}
          </p>

          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            {message || "No response received"}
          </p>
        </>
      )}
    </div>
  );
}

export default App;