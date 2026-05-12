# ⚔️ Agent Swarm vs 竞品对比

> 截至 2026 年 5 月的主流多智能体框架横向对比

## 一句话总结

| 框架 | 定位 | 一句话 |
|------|------|--------|
| **Agent Swarm** 🐝 | 去中心化 Agent 协作 | 像蜂群一样思考 — 无状态通信、共享知识库、自进化 |
| **CrewAI** | Python 多 Agent 工作流 | 最易上手的 Python 多智能体框架 |
| **LangGraph** | 有状态图编排 | 生产级 Agent 编排，适合复杂 DAG |
| **AutoGen (Microsoft)** | 多 Agent 对话 | Agent 之间直接对话完成任务 |
| **MetaGPT** | 软件公司模拟 | 模拟角色扮演式软件开发 |
| **OpenAI Agents SDK** | 官方 Agent SDK | OpenAI 官方，简单直接 |
| **AutoGPT** | 自主任务完成 | 最早的自主 AI Agent，单 Agent 模式 |

---

## 详细对比

### 1. 通信模式

| 框架 | 通信方式 | 优点 | 缺点 |
|------|---------|------|------|
| **Agent Swarm** 🐝 | **无状态通信** — 通过共享知识库交换，不直接对话 | • 不会死循环<br>• 上下文天然版本化<br>• 每个 Agent 独立运行 | 实时性不如直接对话 |
| **CrewAI** | Agent 间直接消息传递 | 简单直观，Python 友好 | 复杂场景下消息爆炸 |
| **LangGraph** | 图状态机 + 节点间显式边 | 完全可控、可追踪 | 配置复杂，上手门槛高 |
| **AutoGen** | Agent 间对话（Conversation） | 自然交互模式 | 对话回路可能导致 token 浪费 |
| **MetaGPT** | 角色间结构化消息 | 模拟软件工程流程 | 仅适用于软件开发场景 |
| **OpenAI SDK** | Function Calling | 官方支持、稳定 | 相对封闭，定制受限 |
| **AutoGPT** | 单 Agent 自循环 | 简单直接 | 上下文溢出严重 |

### 2. 协作模式

| 框架 | 串联链式 | 并行扇出 | 投票共识 | 自进化 |
|------|---------|---------|---------|--------|
| **Agent Swarm** 🐝 | ✅ 原生 | ✅ 原生 | ✅ 原生（加权投票） | ✅ 原生（Evolver Worker） |
| **CrewAI** | ✅ 通过 Process | ✅ 通过 Process | ❌ 需自定义 | ❌ |
| **LangGraph** | ✅ 图结构 | ✅ 图结构 | ⚠️ 需额外逻辑 | ❌ |
| **AutoGen** | ✅ 对话链 | ✅ 多 Agent 对话 | ⚠️ 需自定义 | ❌ |
| **MetaGPT** | ✅ 角色链 | ❌ | ✅ 角色投票 | ❌ |
| **OpenAI SDK** | ⚠️ 手动编排 | ⚠️ 手动编排 | ❌ | ❌ |
| **AutoGPT** | ❌ | ❌ | ❌ | ❌ |

### 3. 记忆系统

| 框架 | 短期记忆 | 长期记忆 | 共享工作区 | 版本化 |
|------|---------|---------|-----------|-------|
| **Agent Swarm** 🐝 | ✅ | ✅ | ✅ Shared Memory | ✅ 追加式 log |
| **CrewAI** | ✅ 上下文 | ❌ | ❌ | ❌ |
| **LangGraph** | ✅ 节点状态 | ✅ 持久化 | ⚠️ 手动 | ❌ |
| **AutoGen** | ✅ 对话历史 | ⚠️ 插件 | ❌ | ❌ |
| **MetaGPT** | ✅ 角色记忆 | ⚠️ | ❌ | ❌ |
| **OpenAI SDK** | ✅ 上下文 | ❌ | ❌ | ❌ |
| **AutoGPT** | ⚠️ 易溢出 | ✅ 文件 | ❌ | ❌ |

### 4. 工具/Skill 体系

| 框架 | 热插拔 | 按 Worker 装配 | 社区 Skill 生态 |
|------|--------|---------------|----------------|
| **Agent Swarm** 🐝 | ✅ 运行时插拔 | ✅ 每个 Worker 独立装配 | 🚧 建设中 |
| **CrewAI** | ❌ | ✅ Agent 级别 | ✅ 丰富 |
| **LangGraph** | ❌ | ⚠️ 节点级别 | ✅ LangChain 生态 |
| **AutoGen** | ✅ | ✅ | ✅ 社区活跃 |
| **MetaGPT** | ❌ | ❌ | ❌ |
| **OpenAI SDK** | ✅ | ✅ | ✅ OpenAI 生态 |
| **AutoGPT** | ⚠️ 插件 | ❌ | ✅ 众多插件 |

### 5. 失败恢复

| 框架 | 自动重试 | 降级策略 | 换 Worker 接替 |
|------|---------|---------|---------------|
| **Agent Swarm** 🐝 | ✅ 指数退避 | ✅ | ✅ |
| **CrewAI** | ⚠️ 有限 | ❌ | ❌ |
| **LangGraph** | ✅ 图级 | ⚠️ | ⚠️ |
| **AutoGen** | ⚠️ | ❌ | ❌ |
| **MetaGPT** | ❌ | ❌ | ❌ |
| **OpenAI SDK** | ❌ | ❌ | ❌ |
| **AutoGPT** | ❌ | ❌ | ❌ |

### 6. 开发语言

| 框架 | 语言 | 安装复杂度 | 社区规模 |
|------|------|-----------|---------|
| **Agent Swarm** 🐝 | Node.js/TypeScript | ⭐ 极简（npm install） | 🚧 新建 |
| **CrewAI** | Python | ⭐⭐ | ⭐⭐⭐⭐ 28K+ Stars |
| **LangGraph** | Python/TypeScript | ⭐⭐⭐（需 LangChain） | ⭐⭐⭐⭐⭐ 10K+ Stars |
| **AutoGen** | Python | ⭐⭐ | ⭐⭐⭐⭐ 40K+ Stars |
| **MetaGPT** | Python | ⭐⭐ | ⭐⭐⭐ 40K+ Stars |
| **OpenAI SDK** | Python/Node/Go | ⭐ | ⭐⭐⭐⭐⭐ |
| **AutoGPT** | Python | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ 170K+ Stars |

---

## 关键差异化（Agent Swarm 独特价值）

### 1. 🧬 自我进化（独创）
唯一内置 Evolver Agent 的框架。其他框架需要外部运维工具来完成健康巡检、技能升级、拓扑优化。

### 2. 🌐 无状态通信（架构级差异）
Agent Swarm 要求 Agent 之间**不直接对话**，全部通过共享知识库交换数据。这和 CrewAI/AutoGen 的"Agent 间直接消息传递"有本质区别：
- ✅ 杜绝死循环（没有对话回路）
- ✅ 中间结果天然版本化（可审计、可回溯）
- ✅ 每个 Agent 可独立扩展（不依赖其他 Agent 的响应）

### 3. 🗳️ 原生投票共识
内置置信度加权投票机制，其他框架需要自行实现。

### 4. 🎯 一人公司友好
轻量级（Node.js），不需要 Python 环境、不需要 LangChain 全家桶、不需要 GPU。npm install 即可运行。

---

## 适用场景建议

```
你的项目是？
    │
    ├── 单 Agent、简单任务 → AutoGPT / OpenAI SDK
    │
    ├── Python 生态、快速多 Agent 原型 → CrewAI
    │
    ├── 复杂生产级 Agent 图编排 → LangGraph
    │
    ├── 需要 Agent 间深度对话 → AutoGen
    │
    ├── 模拟软件团队 → MetaGPT
    │
    └── 🐝 需要以上全部 + 自进化 + 无状态架构
        → Agent Swarm（正在建设中，欢迎参与）
```

---

*最后更新: 2026-05-13*
