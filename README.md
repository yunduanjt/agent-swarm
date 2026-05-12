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

### 🔗 与小米 MiMo 模型深度适配

智能体蜂群架构与小米 MiMo 系列模型的能力映射：

| Worker 类型 | 对应 MiMo 能力 | 协作场景 |
|------------|--------------|---------|
| 🧪 **研究型 Worker** | MiMo-V2.5-Pro **强推理能力** | 长链任务拆解、多源交叉验证、因果推断 |
| ✍️ **创作型 Worker** | MiMo **原生全模态**（文本+图像+音频） | 图文音跨领域协同输出、多模态报告生成 |
| 🚀 **执行型 Worker** | MiMo **Function Calling** | 工具调用、代码生成、自动部署 |
| 🧬 **进化型 Worker** | MiMo **模型自评估** | 自我巡检、性能评估、技能热插拔 |

核心思路：每个 Worker 不再是通用 Agent，而是面向 MiMo 特定能力维度优化的**专用推理节点**。蜂后（Orchestrator）根据任务类型自动路由到最适配的 MiMo 能力通道。

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

#### 🩺 12 维度健康巡检
Evolver Worker 周期性执行全方位自检，涵盖：

| 维度 | 监测项 | 阈值 | 触发动作 |
|------|-------|------|---------|
| 🧠 内存利用率 | Shared Memory 水位 | >85% 告警 | 触发压缩归档 |
| ⚡ API 余额 | 各 Provider 配额剩余 | <20% 告警 | 自动切备用 Provider |
| 📊 错误率 | Worker 失败次数 | >5% 告警 | 降级重试策略 |
| ⏱ 响应延迟 | 平均 Worker 响应时间 | >2s 告警 | 扩容 Worker 池 |
| 🌐 通信质量 | Worker ↔ Memory 延迟 | >500ms 告警 | 切换通信协议 |
| 🔄 任务积压 | Task Queue 堆积数 | >50 告警 | 上调度优先级 |
| 📈 准确率 | 输出与预期偏差 | <80% 告警 | 触发重新训练 |
| 💾 存储水位 | 长期记忆容量 | >90% 告警 | 自动归档清理 |
| 🔌 技能状态 | 已安装 Skill 可用性 | 异常告警 | 重启 Skill 容器 |
| 📝 日志完整性 | 事件日志丢失率 | >1% 告警 | 重建索引 |
| 🔐 安全审计 | 异常访问模式 | 检测即告警 | 隔离 Worker |
| 🌡 系统负载 | CPU/内存全局负载 | >80% 告警 | 限流+降级 |

#### 🧬 自我进化
进化 Worker 定期评估蜂群成员表现，自动闭环：

```
巡检 → 发现瓶颈 → 分析根因 → 制定优化方案
→ Arbiter 审批 → 执行变更 → 验证效果 → 记录进化日志
```

支持 Skill 热插拔、Worker 拓扑调整、缓存策略优化。

#### 📦 其他特性
- **技能热插拔**：30+ 可组合 Skill，按需装配
- **失败回滚**：子任务失败时自动重试、降级或换人接替
- **无状态通信**：Agent 之间不直接对话，通过共享知识库交换，杜绝死循环

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
