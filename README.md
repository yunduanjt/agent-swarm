# 🐝 Agent Swarm — 智能体蜂群

> 去中心化 AI 协作平台 | Decentralized AI Collaboration Platform

[English](#english) | [中文](#中文)

---

## 中文

### 项目简介

**智能体蜂群 (Agent Swarm)** 是一个去中心化的 AI 智能体协作框架。不同于传统的"单 Agent 包办一切"，它让多个专业化 AI Agent 像蜂群一样协同工作——每个 Agent 只做自己最擅长的事，通过蜂后（Orchestrator）的统一调度，解决复杂的长链推理和多领域交叉任务。

### 解决的核心痛点

| 痛点 | 传统方案 | Agent Swarm |
|------|---------|-------------|
| 单 Agent 上下文溢出 | 不断压缩、遗忘 | 任务拆分到不同 Agent，各管一段 |
| 多工具调度混乱 | 一个 Agent 记住所有工具的用法 | 每个 Agent 只装配专属工具集 |
| 长链推理目标偏移 | 推理链越长越容易跑偏 | 共享知识库持久化中间结果 |
| 一人公司资源有限 | 只能做一件事 | 蜂群并行处理多领域任务 |

### 核心架构

```
                    ┌─────────────────────────┐
                    │     🐝 Orchestrator     │
                    │    (蜂后 — 调度中枢)     │
                    │  路由 + 仲裁 + 心跳监控  │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
   ┌────▼────┐           ┌──────▼──────┐         ┌─────▼─────┐
   │ 研究型   │           │   创作型    │         │  执行型   │
   │ Worker  │           │   Worker   │         │  Worker   │   ... 🐝🐝🐝
   │ 数据采集 │           │  内容生成  │         │  代码部署  │
   │ 交叉验证 │           │  报告撰写  │         │  自动化运维 │
   └────┬────┘           └──────┬──────┘         └─────┬─────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    ┌───────────▼────────────┐
                    │    📦 Shared Memory    │
                    │    (共享知识库)          │
                    │  持久化 · 版本化 · 可回溯 │
                    └─────────────────────────┘
```

### 三种协作模式

1. **串联链式推理**：Agent A 输出 → Agent B 输入 → Agent C 输出。例如：研究 Agent 采集数据 → 创作 Agent 撰写报告 → 执行 Agent 部署上线。中间结果写入共享知识库，避免"遗忘"。

2. **并行扇出 + 合并**：一个大任务分解为多个独立子任务，多个 Worker Agent 各负责一个方向，Orchestrator 做归并去重。例如：三个 Agent 从不同角度分析同一数据 → 合成综合报告。

3. **投票共识机制**：关键决策（如定价策略、上架时机）由多个 Agent 独立建议后加权投票，降低单 Agent 幻觉风险。

### 系统特性

- 🩺 **心跳自检**：12 维度健康巡检（系统负载、API 余额、上下文水位等）
- 🧬 **自我进化**：进化 Agent 定期评估成员表现，自动安装/升级 Skill
- 📦 **技能热插拔**：30+ 可组合 Skill，按需装配
- 🔄 **失败回滚**：子任务失败时自动重试、降级或换人接替
- 🌐 **无状态通信**：Agent 之间不直接对话，通过共享知识库交换，杜绝死循环

### 快速开始

```bash
# 克隆仓库
git clone git@github.com:yunduanjt/agent-swarm.git
cd agent-swarm

# 查看架构文档
cat docs/ARCHITECTURE.md
```

---

## English

### Overview

**Agent Swarm** is a decentralized AI agent collaboration framework. Instead of forcing one agent to do everything, it orchestrates multiple specialized agents to work together like a beehive — each agent masters its own domain, coordinated by a central Orchestrator.

### Core Pain Points Solved

- **Context overflow**: Single agents lose context in long tasks → Swarm splits work, each agent owns a segment
- **Tool chaos**: One agent juggling 30+ tools → Each agent carries only its relevant toolset
- **Goal drift**: Long reasoning chains wander → Shared memory persists intermediate results
- **Resource bottleneck**: Solo agent can only do one thing → Swarm processes in parallel

### Key Logic Flow

```
Task In → Orchestrator decomposes → Distributes to specialized Workers
       → Workers run with their own toolkits
       → Results land in Shared Memory
       → Orchestrator merges → Final Output
```

**Three collaboration patterns:**
1. **Sequential chain**: Output of Agent A → Input of Agent B
2. **Parallel fan-out**: Multiple agents work simultaneously → Merge results
3. **Consensus voting**: Weighted voting on critical decisions

### Self-Evolution

The swarm includes a dedicated "Evolver" Agent that:
- Runs 12-dimension health checks periodically
- Evaluates worker performance
- Auto-installs new skills and upgrades
- Suggests topology changes

### Quick Start

```bash
git clone git@github.com:yunduanjt/agent-swarm.git
cd agent-swarm
```

---

## License

MIT
