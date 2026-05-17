#import "src/assets/typst/const.typ": accent
#import "@preview/diagraph:0.3.0": raw-render

#set page(width: auto, height: auto, margin: 1em)

#raw-render(
  ```dot
  graph wiki {
    layout=neato
    overlap=prism
    splines=true
    bgcolor="transparent"
    sep="+25"
    start=42

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

    // projects (larger filled)
    "pricing-revamp" [width=0.26, height=0.26, xlabel="pricing-revamp"]
    "data-platform-migration" [width=0.26, height=0.26, xlabel="data-platform-migration"]
    "customer-portal-v2" [width=0.26, height=0.26, xlabel="customer-portal-v2"]

    // DRIs (hollow)
    "sarah-chen" [style=solid, fillcolor="transparent", color="#2218d6", penwidth=1.0, width=0.2, height=0.2, xlabel="sarah-chen"]
    "marcus-lee" [style=solid, fillcolor="transparent", color="#2218d6", penwidth=1.0, width=0.2, height=0.2, xlabel="marcus-lee"]
    "priya-shah" [style=solid, fillcolor="transparent", color="#2218d6", penwidth=1.0, width=0.2, height=0.2, xlabel="priya-shah"]

    // services
    "billing-svc" [xlabel="billing-svc"]
    "auth-api" [xlabel="auth-api"]
    "analytics-pipeline" [xlabel="analytics-pipeline"]

    // repos
    "monorepo-frontend" [xlabel="monorepo-frontend"]
    "infra-terraform" [xlabel="infra-terraform"]

    // ADRs / concepts / runbooks
    "adr-024-postgres-17" [xlabel="adr-024-postgres-17"]
    "slo-budget" [xlabel="slo-budget"]
    "runbook-oncall" [xlabel="runbook-oncall"]

    // meetings
    "2026-04-01-pricing-revamp-sync" [xlabel="2026-04-01-pricing-revamp-sync"]
    "2026-04-08-pricing-revamp-sync" [xlabel="2026-04-08-pricing-revamp-sync"]
    "2026-04-15-pricing-revamp-sync" [xlabel="2026-04-15-pricing-revamp-sync"]

    // design docs
    "pricing-revamp-design" [xlabel="pricing-revamp-design"]
    "billing-svc-design" [xlabel="billing-svc-design"]

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
