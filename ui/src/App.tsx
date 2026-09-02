import { useEffect, useState } from "react";

const API_BASE_URL = "https://app-api-cicd.azurewebsites.net";

interface StatusResponse {
  status?: string;
  version?: string;
  message?: string;
  pipeline?: string;
  infrastructure?: string;
  platform?: string;
}

interface DeploymentResponse {
  status?: string;
  version?: string;
  release?: string;
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
    const loadDeploymentData = async () => {
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
        console.error("API connection error:", error);
        setApiError("Unable to connect to the Azure API.");
      } finally {
        setLoading(false);
      }
    };

    loadDeploymentData();
  }, []);

  return (
    <div className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          background: #f4f7fb;
          color: #172033;
        }

        .app {
          min-height: 100vh;
          padding: 40px 20px;
        }

        .container {
          max-width: 1120px;
          margin: 0 auto;
        }

        .header {
          background: #ffffff;
          border-radius: 18px;
          padding: 32px;
          margin-bottom: 22px;
          box-shadow: 0 8px 30px rgba(20, 35, 60, 0.08);
          border: 1px solid #e7ebf2;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }

        .eyebrow {
          color: #5267a5;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        h1 {
          margin: 0;
          font-size: 38px;
          line-height: 1.2;
        }

        .subtitle {
          color: #68758b;
          font-size: 16px;
          line-height: 1.7;
          max-width: 760px;
          margin: 14px 0 0;
        }

        .release-badge {
          padding: 10px 15px;
          border-radius: 999px;
          background: #eaf8f0;
          color: #197448;
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(280px, 1fr)
          );
          gap: 20px;
          margin-bottom: 22px;
        }

        .card {
          background: #ffffff;
          border-radius: 18px;
          padding: 26px;
          border: 1px solid #e7ebf2;
          box-shadow: 0 8px 30px rgba(20, 35, 60, 0.06);
        }

        .card-label {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #7a8498;
        }

        .card h2 {
          margin: 9px 0;
          font-size: 24px;
        }

        .card p {
          margin: 0;
          color: #68758b;
          line-height: 1.7;
        }

        .release-info {
          margin-top: 20px;
          padding: 13px 15px;
          border-radius: 10px;
          background: #f5f7fb;
          border: 1px solid #e8ecf3;
          font-size: 14px;
        }

        .validation {
          background: #ffffff;
          border-radius: 18px;
          padding: 30px;
          border: 1px solid #e7ebf2;
          box-shadow: 0 8px 30px rgba(20, 35, 60, 0.06);
          margin-bottom: 22px;
        }

        .validation h2 {
          margin: 0 0 8px;
          font-size: 25px;
        }

        .validation-description {
          color: #68758b;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(210px, 1fr)
          );
          gap: 14px;
        }

        .info-card {
          background: #f7f9fc;
          border: 1px solid #e5eaf2;
          border-radius: 12px;
          padding: 17px;
        }

        .info-title {
          color: #7a8498;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }

        .info-value {
          font-size: 16px;
          font-weight: 750;
          word-break: break-word;
        }

        .loading,
        .error {
          padding: 18px;
          border-radius: 12px;
          font-weight: 600;
        }

        .loading {
          background: #f5f7fb;
          color: #68758b;
        }

        .error {
          background: #fff1f1;
          color: #a33a3a;
          border: 1px solid #f1d4d4;
        }

        .footer {
          background: #172033;
          color: #ffffff;
          border-radius: 18px;
          padding: 30px;
        }

        .footer h2 {
          margin: 0 0 10px;
        }

        .footer p {
          color: #d4dbea;
          line-height: 1.7;
          margin: 0 0 20px;
        }

        .technology-list {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .technology {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          font-size: 12px;
          font-weight: 700;
        }

        @media (max-width: 600px) {
          .app {
            padding: 20px 14px;
          }

          .header {
            padding: 24px;
          }

          h1 {
            font-size: 30px;
          }

          .validation,
          .footer {
            padding: 24px;
          }
        }
      `}</style>

      <main className="container">

        <header className="header">
          <div className="header-top">

            <div>
              <div className="eyebrow">
                UI-API-CICD
              </div>

              <h1>
                Release Validation Dashboard
              </h1>

              <p className="subtitle">
                UI Release 3 validates the complete deployment path from
                source code through GitHub Actions, Terraform, HashiCorp
                Vault and Microsoft Azure.
              </p>
            </div>

            <div className="release-badge">
              ● RELEASE 3 ACTIVE
            </div>

          </div>
        </header>


        <section className="cards">

          <div className="card">
            <div className="card-label">
              Frontend
            </div>

            <h2>
              React + Vite
            </h2>

            <p>
              The frontend is built with React and Vite and deployed to
              Azure Storage Static Website through GitHub Actions.
            </p>

            <div className="release-info">
              <strong>UI Release:</strong> 3
            </div>
          </div>


          <div className="card">
            <div className="card-label">
              Backend
            </div>

            <h2>
              .NET 8 API
            </h2>

            <p>
              The backend runs on Azure App Service and exposes deployment
              and health information to the frontend.
            </p>

            <div className="release-info">
              <strong>API Release:</strong>{" "}
              {loading
                ? "Checking..."
                : apiError
                  ? "Unavailable"
                  : apiStatus?.version ?? "Unknown"}
            </div>
          </div>

        </section>


        <section className="validation">

          <h2>
            Live Deployment Validation
          </h2>

          <p className="validation-description">
            These values are retrieved directly from the deployed Azure API.
            This confirms communication between the newly deployed frontend
            and backend.
          </p>

          {loading && (
            <div className="loading">
              Loading deployment information...
            </div>
          )}

          {apiError && (
            <div className="error">
              {apiError}
            </div>
          )}

          {!loading && !apiError && (
            <div className="info-grid">

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
                title="Release"
                value={deployment?.release ?? "Unknown"}
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


        <footer className="footer">

          <h2>
            CI/CD Release 3
          </h2>

          <p>
            Updated frontend deployment validation using GitHub Actions,
            Terraform-managed Azure infrastructure, HashiCorp Vault version
            management and a .NET 8 API hosted on Azure App Service.
          </p>

          <div className="technology-list">
            <span className="technology">GitHub Actions</span>
            <span className="technology">Terraform</span>
            <span className="technology">HashiCorp Vault</span>
            <span className="technology">React</span>
            <span className="technology">Vite</span>
            <span className="technology">.NET 8</span>
            <span className="technology">Azure Storage</span>
            <span className="technology">Azure App Service</span>
          </div>

        </footer>

      </main>
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
    <div className="info-card">
      <div className="info-title">
        {title}
      </div>

      <div className="info-value">
        {value}
      </div>
    </div>
  );
}


export default App;