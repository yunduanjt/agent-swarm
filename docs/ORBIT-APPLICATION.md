# 🐝 小米 Orbit 计划申请 — 智能体蜂群

> **申请项目**: 智能体蜂群 (Agent Swarm) — 去中心化 AI 协作框架
> **GitHub**: https://github.com/yunduanjt/agent-swarm
> **演示站点**: https://yunduanjt.github.io/agent-swarm/

---

## 一、核心痛点

单 Agent 系统在复杂任务中面临三大结构性缺陷：上下文溢出（长链任务中间结果不断遗忘）、工具调度混乱（一个 Agent 需记忆 30+ 工具调用方式）、目标偏移（推理链越长越易偏离原始目标）。现有方案如 CrewAI、AutoGen 采用 Agent 间直接对话通信，引入死循环和 Token 浪费风险。

## 二、解决方案

核心思路：构建去中心化 Worker 蜂群，每个 Worker 只做最擅长的领域，通过蜂后（Orchestrator）统一调度。

与小米 MiMo 模型深度绑定：研究型 Worker 利用 MiMo-V2.5-Pro 强推理能力做长链拆解与交叉验证；创作型 Worker 利用 MiMo 原生全模态能力处理图文音协同；执行型 Worker 利用 MiMo Function Calling；进化型 Worker 利用 MiMo 模型自评估做 12 维健康巡检与技能热插拔。

三种协作模式：串联链式推理（研究→创作→执行，中间结果写入共享知识库）、并行扇出+合并（多 Worker 同时分析后归并）、投票共识（加权投票降低单 Agent 幻觉风险）。

差异化：无状态通信杜绝死循环、自进化闭环（Evolver Worker 自动巡检→分析→审批→执行→验证→归档）、四级容错体系。

## 三、实施路径

Phase 1（已完成）：四层架构文档、核心引擎原型（可运行，三种协作模式均已代码实现）、竞品对比、GitHub 项目页和展示站。Phase 2：接入真实 LLM API（优先 MiMo）、任务 DAG 解析器、记忆持久化。Phase 3：自进化闭环接入真实指标、Skill 注册中心、Web UI。Phase 4：社区插件系统与主流工具适配。

## 四、生态贡献

为 MiMo 提供从单次问答到复杂多步工作的完整桥梁，Skill 热插拔体系可作为 MiMo 开发者生态的工具分发层，降低一人公司构建多 Agent 系统的门槛。

---

## 项目链接

- **GitHub**: https://github.com/yunduanjt/agent-swarm
- **演示**: https://yunduanjt.github.io/agent-swarm/
- **运行演示**: `git clone https://github.com/yunduanjt/agent-swarm.git && cd agent-swarm && node demo.js`

---

*文档版本: v2.0 · 2026-05-13*
