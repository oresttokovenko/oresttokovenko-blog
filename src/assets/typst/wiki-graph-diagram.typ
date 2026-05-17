#import "src/assets/typst/const.typ": accent
#import "@preview/diagraph:0.3.0": raw-render

#set page(width: auto, height: auto, margin: 1em)

#raw-render(
  ```dot
  graph wiki {
    layout=neato
    mode=sgd
    smoothing=spring
    overlap=prism
    splines=true
    bgcolor="transparent"
    sep="+45"
    start=42
    forcelabels=true

    node [
      shape=circle,
      style=filled,
      fillcolor="#2218d6",
      color="#2218d6",
      width=0.16,
      height=0.16,
      fixedsize=true,
      label="",
      fontname="IBM Plex Mono",
      fontsize=8,
      fontcolor="#2218d6"
    ]

    edge [
      color="#2218d699",
      penwidth=0.5
    ]

    // Node size is base 0.15 + 0.012 per edge (degree centrality).
    // All nodes share the same scale; bigger dot = more connections.

    // projects
    "pricing-revamp" [width=0.258, height=0.258, xlabel="pricing-revamp"] // 9 edges
    "data-platform-migration" [width=0.198, height=0.198, xlabel="data-platform-migration"] // 4
    "customer-portal-v2" [width=0.186, height=0.186, xlabel="customer-portal-v2"] // 3

    // DRIs (hollow)
    "sarah-chen" [style=solid, fillcolor="transparent", color="#2218d6", penwidth=1.0, width=0.234, height=0.234, xlabel="sarah-chen"] // 7
    "marcus-lee" [style=solid, fillcolor="transparent", color="#2218d6", penwidth=1.0, width=0.222, height=0.222, xlabel="marcus-lee"] // 6
    "priya-shah" [style=solid, fillcolor="transparent", color="#2218d6", penwidth=1.0, width=0.186, height=0.186, xlabel="priya-shah"] // 3

    // services
    "billing-svc" [width=0.27, height=0.27, xlabel="billing-svc"] // 10
    "auth-api" [width=0.21, height=0.21, xlabel="auth-api"] // 5
    "analytics-pipeline" [width=0.21, height=0.21, xlabel="analytics-pipeline"] // 5

    // repos
    "monorepo-frontend" [width=0.186, height=0.186, xlabel="monorepo-frontend"] // 3
    "infra-terraform" [width=0.174, height=0.174, xlabel="infra-terraform"] // 2

    // ADRs / concepts / runbooks
    "adr-024-postgres-17" [width=0.222, height=0.222, xlabel="adr-024-postgres-17"] // 6
    "slo-budget" [width=0.198, height=0.198, xlabel="slo-budget"] // 4
    "runbook-oncall" [width=0.222, height=0.222, xlabel="runbook-oncall"] // 6

    // meetings
    "2026-04-01-pricing-revamp-sync" [width=0.198, height=0.198, xlabel="2026-04-01-pricing-revamp-sync"] // 4
    "2026-04-08-pricing-revamp-sync" [width=0.21, height=0.21, xlabel="2026-04-08-pricing-revamp-sync"] // 5
    "2026-04-15-pricing-revamp-sync" [width=0.198, height=0.198, xlabel="2026-04-15-pricing-revamp-sync"] // 4

    // design docs
    "pricing-revamp-design" [width=0.21, height=0.21, xlabel="pricing-revamp-design"] // 5
    "billing-svc-design" [width=0.21, height=0.21, xlabel="billing-svc-design"] // 5

    // -- core project/service edges --
    "pricing-revamp" -- "sarah-chen"
    "pricing-revamp" -- "marcus-lee"
    "pricing-revamp" -- "billing-svc"
    "pricing-revamp" -- "monorepo-frontend"
    "pricing-revamp" -- "adr-024-postgres-17"
    "data-platform-migration" -- "adr-024-postgres-17"
    "data-platform-migration" -- "infra-terraform"
    "data-platform-migration" -- "analytics-pipeline"
    "data-platform-migration" -- "sarah-chen"
    "customer-portal-v2" -- "priya-shah"
    "customer-portal-v2" -- "monorepo-frontend"
    "customer-portal-v2" -- "billing-svc"

    // services / repos cross-links
    "billing-svc" -- "auth-api"
    "billing-svc" -- "slo-budget"
    "billing-svc" -- "runbook-oncall"
    "billing-svc" -- "adr-024-postgres-17"
    "auth-api" -- "slo-budget"
    "auth-api" -- "runbook-oncall"
    "analytics-pipeline" -- "billing-svc"
    "analytics-pipeline" -- "slo-budget"
    "analytics-pipeline" -- "runbook-oncall"
    "analytics-pipeline" -- "infra-terraform"
    "monorepo-frontend" -- "auth-api"

    // DRI cross-coverage
    "sarah-chen" -- "runbook-oncall"
    "marcus-lee" -- "runbook-oncall"
    "priya-shah" -- "runbook-oncall"

    // meetings — each meeting connects to project, DRIs, and the artifacts discussed
    "2026-04-01-pricing-revamp-sync" -- "pricing-revamp"
    "2026-04-01-pricing-revamp-sync" -- "sarah-chen"
    "2026-04-01-pricing-revamp-sync" -- "marcus-lee"
    "2026-04-01-pricing-revamp-sync" -- "pricing-revamp-design"
    "2026-04-08-pricing-revamp-sync" -- "pricing-revamp"
    "2026-04-08-pricing-revamp-sync" -- "sarah-chen"
    "2026-04-08-pricing-revamp-sync" -- "marcus-lee"
    "2026-04-08-pricing-revamp-sync" -- "priya-shah"
    "2026-04-08-pricing-revamp-sync" -- "billing-svc"
    "2026-04-15-pricing-revamp-sync" -- "pricing-revamp"
    "2026-04-15-pricing-revamp-sync" -- "sarah-chen"
    "2026-04-15-pricing-revamp-sync" -- "marcus-lee"
    "2026-04-15-pricing-revamp-sync" -- "adr-024-postgres-17"

    // design docs cross-link to authors, dependencies, and decisions
    "pricing-revamp-design" -- "pricing-revamp"
    "pricing-revamp-design" -- "sarah-chen"
    "pricing-revamp-design" -- "adr-024-postgres-17"
    "pricing-revamp-design" -- "billing-svc"
    "billing-svc-design" -- "billing-svc"
    "billing-svc-design" -- "auth-api"
    "billing-svc-design" -- "marcus-lee"
    "billing-svc-design" -- "adr-024-postgres-17"
    "billing-svc-design" -- "slo-budget"
  }
  ```,
)
