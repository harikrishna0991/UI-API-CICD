import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const apiUrl = "https://app-api-cicd.azurewebsites.net";

  return (
    <div className="app">

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">UI</div>
          <div>
            <div className="brand-name">UI API CI/CD</div>
            <div className="brand-subtitle">Deployment Platform</div>
          </div>
        </div>

        <div className="environment">
          <span className="environment-dot"></span>
          PRODUCTION
        </div>
      </header>

      <main className="container">

        <section className="hero-section">

          <div className="hero-badge">
            CONTINUOUS DELIVERY DEMONSTRATION
          </div>

          <h1>
            UI API <span>CI/CD Platform</span>
          </h1>

          <p className="hero-description">
            A production deployment demonstration using React,
            .NET 8, GitHub Actions, Terraform and Microsoft Azure.
          </p>

          <div className="system-status">
            <span className="status-indicator"></span>
            <div>
              <strong>Deployment Platform Operational</strong>
              <small>All configured services are available</small>
            </div>
          </div>

        </section>

        <section className="services">

          <div className="service-card ui-card">
            <div className="service-icon">UI</div>

            <div className="service-content">
              <div className="service-label">FRONTEND</div>

              <h2>Web Application</h2>

              <p>
                React application built with Vite and deployed
                using Azure Storage Static Website.
              </p>

              <div className="technology">
                <span>React</span>
                <span>Vite</span>
                <span>Azure Storage</span>
              </div>
            </div>
          </div>

          <div className="service-card api-card">
            <div className="service-icon">API</div>

            <div className="service-content">
              <div className="service-label">BACKEND</div>

              <h2>API Service</h2>

              <p>
                .NET 8 REST API hosted on Microsoft Azure App Service
                and deployed through GitHub Actions.
              </p>

              <div className="technology">
                <span>.NET 8</span>
                <span>Azure App Service</span>
                <span>REST API</span>
              </div>
            </div>
          </div>

        </section>

        <section className="endpoint-section">

          <div className="section-heading">
            <div>
              <div className="section-label">API ACCESS</div>
              <h2>Available Endpoints</h2>
            </div>

            <span className="live-badge">
              LIVE
            </span>
          </div>

          <div className="endpoint-card">

            <div className="endpoint-info">

              <div className="endpoint-method">
                GET
              </div>

              <div>
                <strong>Weather Forecast</strong>
                <p>
                  Returns the current demonstration weather forecast.
                </p>
              </div>

            </div>

            <a
              href={`${apiUrl}/weatherforecast`}
              target="_blank"
              rel="noreferrer"
              className="endpoint-button"
            >
              View Forecast
              <span>→</span>
            </a>

          </div>

        </section>

        <section className="pipeline-section">

          <div className="section-label">
            DELIVERY PIPELINE
          </div>

          <h2>
            Automated Deployment Flow
          </h2>

          <div className="pipeline">

            <div className="pipeline-node">
              <div className="node-number">01</div>
              <strong>GitHub</strong>
              <span>Source Code</span>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-node">
              <div className="node-number">02</div>
              <strong>GitHub Actions</strong>
              <span>CI/CD</span>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-node">
              <div className="node-number">03</div>
              <strong>Terraform</strong>
              <span>Infrastructure</span>
            </div>

            <div className="pipeline-arrow">→</div>

            <div className="pipeline-node">
              <div className="node-number">04</div>
              <strong>Microsoft Azure</strong>
              <span>Production</span>
            </div>

          </div>

        </section>

        <section className="demo-section">

          <div>
            <div className="section-label">
              CI/CD VALIDATION
            </div>

            <h2>Frontend Deployment Test</h2>

            <p>
              Modify the UI source code and push the change to the
              main branch to trigger the automated deployment pipeline.
            </p>
          </div>

          <button
            className="counter-button"
            onClick={() => setCount((value) => value + 1)}
          >
            Deployment Test: {count}
          </button>

        </section>

      </main>

      <footer>
        <span>UI API CI/CD Platform</span>
        <span>GitHub Actions</span>
        <span>Terraform</span>
        <span>Microsoft Azure</span>
      </footer>

    </div>
  );
}

export default App;
