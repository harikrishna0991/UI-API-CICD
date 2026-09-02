import { useEffect, useState } from "react";

const API_BASE_URL = "https://app-api-cicd.azurewebsites.net";

interface StatusResponse {
  status?: string;
  version?: string;
  message?: string;
}

interface DeploymentResponse {
  status?: string;
  version?: string;
  pipeline?: string;
  infrastructure?: string;
  platform?: string;
  message?: string;
  timestamp?: string;
}

function App() {
  const [apiStatus, setApiStatus] = useState<StatusResponse | null>(null);
  const [deployment, setDeployment] =
    useState<DeploymentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const loadDeploymentInformation = async () => {
      try {
        setLoading(true);
        setApiError("");

        const [statusResponse, deploymentResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/status`),
          fetch(`${API_BASE_URL}/api/deployment`),
        ]);

        if (!statusResponse.ok || !deploymentResponse.ok) {
          throw new Error("API request failed");
        }

        const statusData: StatusResponse = await statusResponse.json();
        const deploymentData: DeploymentResponse =
          await deploymentResponse.json();

        setApiStatus(statusData);
        setDeployment(deploymentData);
      } catch (error) {
        console.error(error);
        setApiError("Unable to connect to the Azure API.");
      } finally {
        setLoading(false);
      }
    };

    loadDeploymentInformation();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef4ff 0%, #f8fbff 50%, #eef8f3 100%)",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        color: "#172033",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 10px 35px rgba(31, 45, 61, 0.08)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#5267a5",
                  marginBottom: "8px",
                }}
              >
                UI-API-CICD
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "36px",
                  lineHeight: 1.2,
                }}
              >
                Frontend Deployment Test — Release 2
              </h1>

              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: "16px",
                  color: "#657085",
                  maxWidth: "720px",
                }}
              >
                This release validates the complete React, .NET API, Terraform,
                Azure and GitHub Actions deployment workflow.
              </p>
            </div>

            <div
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                background: "#e9f8ef",
                color: "#18794e",
                fontWeight: 700,
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              ● CI/CD Release Active
            </div>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 10px 35px rgba(31, 45, 61, 0.07)",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#5267a5",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Frontend
            </div>

            <h2 style={{ margin: "10px 0 8px" }}>
              React + Vite
            </h2>

            <p style={{ color: "#657085", lineHeight: 1.6 }}>
              Static frontend deployed to Azure Storage Static Website through
              GitHub Actions.
            </p>

            <div
              style={{
                marginTop: "18px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#f5f7fb",
                fontSize: "14px",
              }}
            >
              <strong>Release:</strong> UI-Release-2
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "25px",
              boxShadow: "0 10px 35px rgba(31, 45, 61, 0.07)",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#5267a5",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Backend
            </div>

            <h2 style={{ margin: "10px 0 8px" }}>
              .NET 8 API
            </h2>

            <p style={{ color: "#657085", lineHeight: 1.6 }}>
              REST API deployed to Azure App Service and validated directly
              from the frontend.
            </p>

            <div
              style={{
                marginTop: "18px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#f5f7fb",
                fontSize: "14px",
              }}
            >
              <strong>API:</strong>{" "}
              {loading ? "Checking..." : apiError ? "Offline" : "Connected"}
            </div>
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "28px",
            boxShadow: "0 10px 35px rgba(31, 45, 61, 0.07)",
            marginBottom: "24px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Deployment Validation
          </h2>

          <p
            style={{
              color: "#657085",
              lineHeight: 1.7,
              marginBottom: "22px",
            }}
          >
            The information below is retrieved from the deployed Azure API.
            This confirms that the updated frontend is communicating with the
            updated backend.
          </p>

          {loading && (
            <div
              style={{
                padding: "18px",
                borderRadius: "12px",
                background: "#f5f7fb",
              }}
            >
              Loading deployment information...
            </div>
          )}

          {apiError && (
            <div
              style={{
                padding: "18px",
                borderRadius: "12px",
                background: "#fff1f1",
                color: "#a33a3a",
              }}
            >
              {apiError}
            </div>
          )}

          {!loading && !apiError && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              <InfoCard
                title="API Status"
                value={apiStatus?.status ?? "Unknown"}
              />

              <InfoCard
                title="API Version"
                value={apiStatus?.version ?? "Unknown"}
              />

              <InfoCard
                title="Deployment Status"
                value={deployment?.status ?? "Unknown"}
              />

              <InfoCard
                title="Deployment Version"
                value={deployment?.version ?? "Unknown"}
              />

              <InfoCard
                title="Pipeline"
                value={deployment?.pipeline ?? "Unknown"}
              />

              <InfoCard
                title="Infrastructure"
                value={deployment?.infrastructure ?? "Unknown"}
              />

              <InfoCard
                title="Platform"
                value={deployment?.platform ?? "Unknown"}
              />

              <InfoCard
                title="Deployment Time"
                value={
                  deployment?.timestamp
                    ? new Date(
                        deployment.timestamp
                      ).toLocaleString()
                    : "Unknown"
                }
              />
            </div>
          )}
        </section>

        <section
          style={{
            background: "#172033",
            color: "#ffffff",
            borderRadius: "18px",
            padding: "28px",
            boxShadow: "0 10px 35px rgba(31, 45, 61, 0.12)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Release 2 Deployment
          </h2>

          <p
            style={{
              color: "#d6dcea",
              lineHeight: 1.7,
              marginBottom: "20px",
            }}
          >
            Latest UI deployment through GitHub Actions with Terraform-managed
            Azure infrastructure and a .NET 8 backend.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {[
              "GitHub Actions",
              "Terraform",
              "React",
              "Vite",
              ".NET 8",
              "Azure Storage",
              "Azure App Service",
              "HashiCorp Vault",
            ].map((technology) => (
              <span
                key={technology}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.1)",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {technology}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "12px",
        background: "#f6f8fc",
        border: "1px solid #e5e9f2",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          color: "#7a8498",
          marginBottom: "7px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "17px",
          fontWeight: 700,
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default App;