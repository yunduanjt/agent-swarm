# 🏗️ Agent Swarm Architecture

## Layer Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    🐝 Orchestrator Layer                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐ │
│  │  Router   │ │  Arbiter │ │  Monitor  │ │ Task Queue    │ │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    🐝 Worker Layer                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ Research  │ │ Creative │ │ Executor │ │  Evolver     │ │
│  │ Worker   │ │ Worker   │ │ Worker   │ │  Worker      │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    🧠 Memory Layer                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ Short-term│ │ Long-term│ │ Shared   │ │ Episodic     │ │
│  │ Buffer   │ │ Storage  │ │ Workspace│ │ Log          │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    🔧 Skill Layer                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ Browser   │ │ Web      │ │ Doc      │ │ Analytics    │ │
│  │ Auto     │ │ Search   │ │ Gen      │ │ & More...    │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Orchestrator Components

### Router
- Receives user intent
- Decomposes into sub-tasks
- Routes to appropriate Worker(s)
- Handles task dependency graph

### Arbiter
- Merges parallel results
- Resolves conflicts via voting
- Detects hallucination anomalies
- Makes final quality call

### Monitor
- Health check (12 dimensions)
- Performance metrics
- Alert & self-heal triggers
- Resource budgeting

### Task Queue
- Priority-based scheduling
- Dependency resolution
- Retry & backoff logic
- Dead letter handling

## Worker Specifications

### Research Worker
- **Skills**: Web search, Web scraping, Document analysis, OCR
- **Best for**: Market research, Data collection, Fact verification
- **Output**: Structured data, Analysis reports

### Creative Worker
- **Skills**: Content generation, SEO writing, Image creation
- **Best for**: Blog posts, Product descriptions, Marketing copy
- **Output**: Polished content

### Executor Worker
- **Skills**: Git operations, Code execution, Deployment
- **Best for**: Automation, CI/CD, Infrastructure tasks
- **Output**: Deployed changes, Logs

### Evolver Worker
- **Skills**: System monitoring, Config management, Package management
- **Best for**: Self-improvement, Health checks, Skill upgrades
- **Output**: Audit reports, Upgrade plans

## Collaboration Patterns

### Pattern 1: Sequential Chain

```
Task: Write + Deploy a blog post about market research

Research Worker ──► Creative Worker ──► Executor Worker
     |                    |                    |
  Collect data       Write article        Push to GitHub
  Analyze trends     Format HTML          Deploy Pages
```

### Pattern 2: Parallel Fan-Out

```
Task: Analyze a new market opportunity

        ┌──► Financial Analyst Worker ──┐
        │    (P&L projections)          │
Task ───┼──► Market Researcher ─────────┼──► Merge Report
        │    (Competition analysis)     │
        └──► Product Specialist ───────┘
             (Feature gap analysis)
```

### Pattern 3: Consensus Voting

```
Task: Set pricing for a new product

┌── Agent A: Cost-based ──┐
├── Agent B: Competitor-based ──┼──► Weighted Vote ──► Final Price
├── Agent C: Value-based  ──┤
└── Agent D: Risk analysis ──┘
```

## Memory Architecture

| Memory Type | Scope | Persistence | Access Pattern |
|------------|-------|-------------|----------------|
| Short-term | Current task | Ephemeral | Direct read/write |
| Shared Workspace | Cross-agent | Task lifetime | Read after write |
| Long-term | Cross-session | Permanent | Semantic search |
| Episodic Log | All events | Append-only | Chronological query |

## Skill Registration

```yaml
skill:
  id: web-scraper
  version: 1.0.0
  capabilities:
    - http_get
    - html_parse
    - data_extract
  requirements:
    - python >= 3.9
    - beautifulsoup4
  compatible_workers:
    - research
    - executor
```

## 12-Dimension Health Check (Evolver)

Evolver Worker runs periodic patrols across 12 dimensions, creating a closed-loop "AI managing AI" self-evolution cycle.

| # | Dimension | Key Metric | Warning Threshold | Auto-Action |
|---|-----------|-----------|------------------|-------------|
| 1 | 🧠 **Memory Usage** | Shared Memory水位  | >85% | Trigger compression + archival |
| 2 | ⚡ **API Quota** | Remaining provider quota | <20% | Auto-switch to backup provider |
| 3 | 📊 **Error Rate** | Worker failure count / total | >5% | Enable degraded retry strategy |
| 4 | ⏱ **Latency** | Average worker response time | >2,000ms | Scale out worker pool |
| 5 | 🌐 **Communication QoS** | Worker ↔ Memory round-trip | >500ms | Switch communication protocol |
| 6 | 🔄 **Backlog Depth** | Task queue accumulation | >50 items | Elevate scheduling priority |
| 7 | 📈 **Accuracy Drift** | Output vs expected deviation | <80% | Trigger retraining |
| 8 | 💾 **Storage Pressure** | Long-term memory capacity | >90% | Auto-archive and clean stale data |
| 9 | 🔌 **Skill Integrity** | Installed skill availability | Any failure | Restart skill container |
| 10 | 📝 **Log Completeness** | Event log loss rate | >1% | Rebuild index |
| 11 | 🔐 **Security Audit** | Anomalous access patterns | On detection | Isolate suspicious worker |
| 12 | 🌡 **System Load** | CPU/memory global utilization | >80% | Rate-limit + graceful degradation |

### Self-Evolution Cycle

```
Monitor ──► Detect anomaly (e.g., memory usage > 85%)
    │
    ▼
Evolver ──► Analyze root cause (Skill_heavy_logging consuming 40%)
    │
    ▼
Evolver ──► Propose fix (Add caching layer, enable compression)
    │
    ▼
Arbiter ──► Approve or reject
    │         If approve: mark for hot-reload
    │         If reject:  log reason, flag for human review
    ▼
Evolver ──► Execute fix (Configure cache TTL, enable compression)
    │
    ▼
Monitor ──► Verify improvement (Memory now at 62%)
    │
    ▼
Log ──► Document change in evolution log
         - Action: caching optimization
         - Before: 85% → After: 62%
         - Tokens saved: ~1,200 per hour
         - Timestamp + worker identity
```

This loop runs on a tunable schedule (default: every 10 minutes). The system accumulates an "evolution memory" that informs future decisions — if the same anomaly pattern recurs, the fix applies faster.

## Failure Recovery

| Failure Type | Strategy | Fallback |
|-------------|----------|----------|
| Worker timeout | Retry (3x, exponential backoff) | Route to another worker |
| Skill unavailble | Graceful degradation | Use alternative skill |
| Memory full | Compress + archive | Trigger cleanup agent |
| API rate limit | Queue + retry after reset | Switch provider |
