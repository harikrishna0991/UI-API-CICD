import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "https://app-api-cicd.azurewebsites.net";

type DashboardData = {
  resources: number;
  healthyResources: number;
  warnings: number;
  critical: number;
  deployments: number;
  successfulDeployments: number;
  failedDeployments: number;
  uptime: number;
  monthlyCost: number;
};

type Service = {
  name: string;
  type: string;
  status: string;
  region: string;
  endpoint: string;
};

type Deployment = {
  version: string;
  component: string;
  status: string;
  environment: string;
  timestamp: string;
};

type HealthData = {
  status: string;
  version: string;
  release: string;
  timestamp: string;
};

function App() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        dashboardResponse,
        servicesResponse,
        deploymentsResponse,
        healthResponse,
      ] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard`),
        fetch(`${API_BASE}/api/services`),
        fetch(`${API_BASE}/api/deployments`),
        fetch(`${API_BASE}/api/health`),
      ]);

      const dashboardData = await dashboardResponse.json();
      const servicesData = await servicesResponse.json();
      const deploymentsData = await deploymentsResponse.json();
      const healthData = await healthResponse.json();

      setDashboard(dashboardData);
      setServices(servicesData);
      setDeployments(deploymentsData);
      setHealth(healthData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Dashboard loading failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatTime = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="app-shell">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">
            WW
          </div>

          <div>
            <div className="brand-name">
              WorkWixa
            </div>

            <div className="brand-subtitle">
              Cloud Platform
            </div>
          </div>
        </div>

        <div className="workspace">
          <div className="workspace-label">
            WORKSPACE
          </div>

          <div className="workspace-selector">
            <div>
              <strong>Production</strong>
              <span>Enterprise Environment</span>
            </div>

            <span className="chevron">
              ˅
            </span>
          </div>
        </div>

        <nav className="navigation">

          <div className="nav-section">
            GENERAL
          </div>

          <a className="nav-item active">
            <span className="nav-icon">▦</span>
            Overview
          </a>

          <a className="nav-item">
            <span className="nav-icon">◫</span>
            Resources
          </a>

          <a className="nav-item">
            <span className="nav-icon">◉</span>
            Monitoring
          </a>

          <a className="nav-item">
            <span className="nav-icon">⚙</span>
            Settings
          </a>

          <div className="nav-section">
            OPERATIONS
          </div>

          <a className="nav-item">
            <span className="nav-icon">⇧</span>
            Deployments
            <span className="nav-badge">3</span>
          </a>

          <a className="nav-item">
            <span className="nav-icon">⌁</span>
            Activity Log
          </a>

          <a className="nav-item">
            <span className="nav-icon">♢</span>
            Infrastructure
          </a>

          <div className="nav-section">
            MANAGEMENT
          </div>

          <a className="nav-item">
            <span className="nav-icon">♙</span>
            Users
          </a>

          <a className="nav-item">
            <span className="nav-icon">▤</span>
            Reports
          </a>

        </nav>

        <div className="sidebar-bottom">

          <div className="support-card">
            <div className="support-icon">
              ?
            </div>

            <div>
              <strong>Need help?</strong>
              <span>View documentation</span>
            </div>
          </div>

          <div className="profile">

            <div className="avatar">
              HK
            </div>

            <div className="profile-info">
              <strong>Administrator</strong>
              <span>Platform Admin</span>
            </div>

            <span className="profile-menu">
              •••
            </span>

          </div>

        </div>

      </aside>


      {/* MAIN AREA */}

      <main className="main">

        {/* TOP BAR */}

        <header className="topbar">

          <div className="breadcrumb">
            <span>WorkWixa</span>
            <span>/</span>
            <strong>Overview</strong>
          </div>

          <div className="topbar-actions">

            <div className="search">
              <span>⌕</span>
              <input
                placeholder="Search resources..."
              />
              <kbd>Ctrl K</kbd>
            </div>

            <button className="icon-button">
              ◔
            </button>

            <button className="icon-button notification">
              ♢
              <span></span>
            </button>

            <div className="top-avatar">
              HK
            </div>

          </div>

        </header>


        {/* CONTENT */}

        <div className="content">

          {/* PAGE HEADER */}

          <section className="page-header">

            <div>

              <div className="eyebrow">
                CLOUD MANAGEMENT
              </div>

              <h1>
                Resource Overview
              </h1>

              <p>
                Monitor your applications, infrastructure and
                deployment environment from one place.
              </p>

            </div>

            <div className="header-actions">

              <button
                className="secondary-button"
                onClick={loadDashboard}
              >
                ↻ Refresh
              </button>

              <button className="primary-button">
                + Create Resource
              </button>

            </div>

          </section>


          {/* STATUS BAR */}

          <section className="status-strip">

            <div className="status-main">

              <span className="status-dot"></span>

              <div>
                <strong>
                  All systems operational
                </strong>

                <span>
                  Production environment is running normally
                </span>
              </div>

            </div>

            <div className="updated">
              Updated {lastUpdated.toLocaleTimeString()}
            </div>

          </section>


          {/* METRICS */}

          <section className="metrics-grid">

            <MetricCard
              title="Total Resources"
              value={dashboard?.resources ?? "--"}
              detail="Across production"
              icon="▦"
            />

            <MetricCard
              title="Healthy Resources"
              value={dashboard?.healthyResources ?? "--"}
              detail={`${dashboard?.resources
                ? Math.round(
                    ((dashboard.healthyResources /
                      dashboard.resources) *
                      100)
                  )
                : 0}% healthy`}
              icon="✓"
              positive
            />

            <MetricCard
              title="Deployments"
              value={dashboard?.deployments ?? "--"}
              detail={`${dashboard?.successfulDeployments ?? 0} successful`}
              icon="⇧"
            />

            <MetricCard
              title="Platform Uptime"
              value={
                dashboard
                  ? `${dashboard.uptime}%`
                  : "--"
              }
              detail="Last 30 days"
              icon="◉"
              positive
            />

          </section>


          {/* TWO COLUMN */}

          <section className="dashboard-grid">

            {/* RESOURCE HEALTH */}

            <div className="panel">

              <div className="panel-header">

                <div>
                  <h2>Resource Health</h2>
                  <span>
                    Current infrastructure status
                  </span>
                </div>

                <button className="view-button">
                  View all →
                </button>

              </div>

              <div className="health-content">

                <div className="health-ring">

                  <div className="ring-center">
                    <strong>
                      {dashboard?.resources ?? "--"}
                    </strong>
                    <span>Resources</span>
                  </div>

                </div>

                <div className="health-list">

                  <HealthRow
                    label="Healthy"
                    value={
                      dashboard?.healthyResources ?? 0
                    }
                    className="healthy"
                  />

                  <HealthRow
                    label="Warning"
                    value={
                      dashboard?.warnings ?? 0
                    }
                    className="warning"
                  />

                  <HealthRow
                    label="Critical"
                    value={
                      dashboard?.critical ?? 0
                    }
                    className="critical"
                  />

                </div>

              </div>

            </div>


            {/* PLATFORM */}

            <div className="panel">

              <div className="panel-header">

                <div>
                  <h2>Platform Information</h2>
                  <span>
                    Application environment
                  </span>
                </div>

              </div>

              <div className="platform-list">

                <InfoRow
                  label="Environment"
                  value="Production"
                />

                <InfoRow
                  label="Cloud Provider"
                  value="Microsoft Azure"
                />

                <InfoRow
                  label="Region"
                  value="Central India"
                />

                <InfoRow
                  label="API Version"
                  value={health?.version ?? "--"}
                />

                <InfoRow
                  label="Release"
                  value={health?.release ?? "--"}
                />

                <InfoRow
                  label="Infrastructure"
                  value="Terraform"
                />

              </div>

            </div>

          </section>


          {/* SERVICES */}

          <section className="panel services-panel">

            <div className="panel-header">

              <div>
                <h2>Application Services</h2>
                <span>
                  Connected services and infrastructure
                </span>
              </div>

              <button className="view-button">
                Manage services →
              </button>

            </div>

            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>SERVICE</th>
                    <th>TYPE</th>
                    <th>STATUS</th>
                    <th>REGION</th>
                    <th>ENDPOINT</th>
                  </tr>

                </thead>

                <tbody>

                  {services.map((service) => (

                    <tr key={service.name}>

                      <td>
                        <div className="service-name">

                          <div className="service-icon">
                            {service.name
                              .charAt(0)}
                          </div>

                          <strong>
                            {service.name}
                          </strong>

                        </div>
                      </td>

                      <td>
                        {service.type}
                      </td>

                      <td>

                        <span className="status-pill healthy-pill">
                          <span></span>
                          {service.status}
                        </span>

                      </td>

                      <td>
                        {service.region}
                      </td>

                      <td>

                        <span className="endpoint">
                          {service.endpoint}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* DEPLOYMENTS */}

          <section className="panel">

            <div className="panel-header">

              <div>
                <h2>Recent Deployments</h2>
                <span>
                  Latest CI/CD activity
                </span>
              </div>

              <button className="view-button">
                View deployment history →
              </button>

            </div>

            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>VERSION</th>
                    <th>COMPONENT</th>
                    <th>STATUS</th>
                    <th>ENVIRONMENT</th>
                    <th>DEPLOYED</th>
                  </tr>

                </thead>

                <tbody>

                  {deployments.map((deployment) => (

                    <tr key={`${deployment.version}-${deployment.timestamp}`}>

                      <td>
                        <strong className="version">
                          {deployment.version}
                        </strong>
                      </td>

                      <td>
                        {deployment.component}
                      </td>

                      <td>

                        <span
                          className={
                            deployment.status ===
                            "Succeeded"
                              ? "status-pill healthy-pill"
                              : "status-pill failed-pill"
                          }
                        >

                          <span></span>

                          {deployment.status}

                        </span>

                      </td>

                      <td>
                        {deployment.environment}
                      </td>

                      <td>
                        {formatTime(
                          deployment.timestamp
                        )}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* API FOOTER */}

          <section className="api-footer">

            <div>

              <div className="api-indicator">
                <span></span>
                API Connected
              </div>

              <strong>
                Enterprise Cloud API
              </strong>

              <p>
                Last health check:
                {" "}
                {health
                  ? formatTime(health.timestamp)
                  : "Checking..."}
              </p>

            </div>

            <div className="api-details">

              <div>
                <span>Version</span>
                <strong>
                  {health?.version ?? "--"}
                </strong>
              </div>

              <div>
                <span>Release</span>
                <strong>
                  {health?.release ?? "--"}
                </strong>
              </div>

              <div>
                <span>Pipeline</span>
                <strong>
                  GitHub Actions
                </strong>
              </div>

            </div>

          </section>


          <footer className="footer">

            <span>
              © 2026 WorkWixa Cloud Platform
            </span>

            <div>
              <span>Documentation</span>
              <span>Support</span>
              <span>Privacy</span>
            </div>

          </footer>

        </div>

      </main>

      {loading && (
        <div className="loading">
          Loading...
        </div>
      )}

    </div>
  );
}


// ---------------------------------------------------------
// Metric Card
// ---------------------------------------------------------

function MetricCard({
  title,
  value,
  detail,
  icon,
  positive,
}: {
  title: string;
  value: string | number;
  detail: string;
  icon: string;
  positive?: boolean;
}) {
  return (
    <div className="metric-card">

      <div className="metric-top">

        <span className="metric-title">
          {title}
        </span>

        <div className="metric-icon">
          {icon}
        </div>

      </div>

      <div className="metric-value">
        {value}
      </div>

      <div
        className={
          positive
            ? "metric-detail positive"
            : "metric-detail"
        }
      >
        {positive && "↑ "}
        {detail}
      </div>

    </div>
  );
}


// ---------------------------------------------------------
// Health Row
// ---------------------------------------------------------

function HealthRow({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div className="health-row">

      <div>
        <span className={`health-marker ${className}`}></span>
        {label}
      </div>

      <strong>
        {value}
      </strong>

    </div>
  );
}


// ---------------------------------------------------------
// Info Row
// ---------------------------------------------------------

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="info-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}

export default App;