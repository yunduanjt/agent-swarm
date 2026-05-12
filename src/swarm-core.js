/**
 * 🐝 Agent Swarm — Core Engine
 * 
 * Minimal runtime to demonstrate three collaboration patterns:
 *   1. Sequential Chain — Agent A → Agent B → Agent C
 *   2. Parallel Fan-Out — Multiple agents → Merge
 *   3. Consensus Voting — Weighted vote on decisions
 */

'use strict';

// ─── Shared Memory ───────────────────────────────────────────
class SharedMemory {
  constructor() {
    this._store = new Map();
    this._log = [];
  }

  set(key, value, meta = {}) {
    const entry = { key, value, meta, timestamp: Date.now() };
    this._store.set(key, value);
    this._log.push(entry);
    return entry;
  }

  get(key) { return this._store.get(key); }

  append(key, value) {
    const existing = this._store.get(key) || [];
    existing.push(value);
    this._store.set(key, existing);
  }

  snapshot() {
    const obj = {};
    for (const [k, v] of this._store) obj[k] = v;
    return obj;
  }

  history() { return this._log; }
}

// ─── Worker Base ──────────────────────────────────────────────
class Worker {
  constructor(id, role, skills = [], specialties = '') {
    this.id = id;
    this.role = role;
    this.skills = skills;
    this.specialties = specialties;
    this.stats = { tasksCompleted: 0, tokensUsed: 0 };
  }

  async execute(task, context = {}) {
    this.stats.tasksCompleted++;
    const result = await this._process(task, context);
    return { worker: this.id, role: this.role, result, task, ts: Date.now() };
  }

  // Simulates LLM processing with latency + tokens
  async _simulate(prompt, tokens = 200) {
    this.stats.tokensUsed += tokens;
    await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
    return { content: prompt, tokens };
  }
}

// ─── Research Worker ──────────────────────────────────────────
class ResearchWorker extends Worker {
  constructor(id = 'research-1') {
    super(id, 'Research', ['web_search', 'web_scrape', 'ocr', 'data_analyze'],
          '数据采集、交叉验证、趋势分析');
  }

  async _process(task, context) {
    const sim = await this._simulate(
      `[📊 Research Agent] 正在采集「${task.query || task}」相关数据...`
    );
    const findings = this._generateFindings(task);
    return { content: sim.content, findings, confidence: 0.85 + Math.random() * 0.1, tokens: sim.tokens };
  }

  _generateFindings(task) {
    const domain = (task.query || '').toLowerCase();
    if (domain.includes('市场') || domain.includes('market')) {
      return {
        summary: `「${task.query}」市场规模约 ¥280-350 亿，年增长率 22%`,
        competitors: ['领先品牌 A 市占率 28%', '新兴品牌 B 增速 45%', '传统品牌 C 下滑至 12%'],
        opportunities: ['细分人群 D 未被充分覆盖', '线上渗透率仅 34% 有增长空间'],
        sources: ['行业报告(2026Q1)', '竞品官网分析', '社交媒体舆情']
      };
    }
    if (domain.includes('产品') || domain.includes('product')) {
      return {
        summary: `${task.query} 产品评分 4.2/5.0，核心竞品 3 个`,
        reviews: { positive: '做工精细、性价比高', negative: '续航偏短、配件少' },
        priceRange: { min: 59, max: 299, avg: 139 }
      };
    }
    return { summary: `已采集 ${task.query} 相关数据点 47 个`, raw: true };
  }
}

// ─── Creative Worker ──────────────────────────────────────────
class CreativeWorker extends Worker {
  constructor(id = 'creative-1') {
    super(id, 'Creative', ['content_gen', 'seo_write', 'image_prompt', 'story_tell'],
          '内容创作、文案生成、品牌叙事');
  }

  async _process(task, context) {
    const sim = await this._simulate(
      `[✍️ Creative Agent] 正在撰写「${task.topic || task}」相关内容...`
    );

    const research = context.shared?.get('research_findings');
    const article = this._generateArticle(task, research);

    return { content: sim.content, article, wordCount: article.length, tokens: sim.tokens };
  }

  _generateArticle(task, research) {
    const topic = task.topic || task;
    const findings = research?.findings;
    return `# ${topic}\n\n` +
      `${findings ? `**数据支撑：** ${findings.summary}\n\n` : ''}` +
      `## 核心洞察\n\n` +
      `在深入分析后，我们发现${topic}领域正经历三大变革：\n` +
      `1. **技术驱动** — AI 能力从辅助工具向自主决策演进\n` +
      `2. **生态重构** — 平台与开发者关系从单向到协作\n` +
      `3. **体验升级** — 用户期望从功能满足到价值共鸣\n\n` +
      `## 战略建议\n\n` +
      `基于以上分析，建议采取「敏捷验证 + 纵深突破」策略，` +
      `在 3 个月内完成 MVP 验证，6 个月内形成竞争壁垒。\n\n` +
      `> *本文由 Agent Swarm Creative Worker 自动生成*`;
  }
}

// ─── Executor Worker ──────────────────────────────────────────
class ExecutorWorker extends Worker {
  constructor(id = 'executor-1') {
    super(id, 'Executor', ['git_ops', 'deploy', 'monitor', 'shell_exec'],
          '自动部署、CI/CD、GitOps');
  }

  async _process(task, context) {
    const sim = await this._simulate(
      `[🚀 Executor Agent] 正在执行「${task.action || task}」...`
    );
    return {
      content: sim.content,
      deployed: true,
      url: task.action === '部署网站'
        ? 'https://yunduanjt.github.io/agent-swarm/'
        : undefined,
      commit: `a1b2c3d — ${task.description || 'auto update'}`,
      tokens: sim.tokens,
    };
  }
}

// ─── Evolver Worker ───────────────────────────────────────────
class EvolverWorker extends Worker {
  constructor(id = 'evolver-1') {
    super(id, 'Evolver', ['health_check', 'config_mgmt', 'perf_analyze'],
          '系统监控、自我进化、性能优化');
  }

  async _process(task, context) {
    const sim = await this._simulate(
      `[🧬 Evolver Agent] 执行 12 维度健康巡检...`
    );
    const health = {
      status: Math.random() > 0.2 ? 'healthy' : 'warning',
      score: 0.88 + Math.random() * 0.12,
      dimensions: {
        memory: '84% (normal)',
        api_quota: '67% remaining',
        error_rate: '1.2%',
        avg_response_ms: 342,
        uptime: '99.7%'
      },
      suggestions: Math.random() > 0.5
        ? ['考虑增加 Research Worker 并发数', '缓存层命中率可优化']
        : ['系统运行良好，无需调整']
    };
    return { content: sim.content, health, tokens: sim.tokens };
  }
}

// ─── Orchestrator ─────────────────────────────────────────────
class Orchestrator {
  constructor(options = {}) {
    this.name = options.name || '蜂后';
    this.workers = new Map();
    this.shared = new SharedMemory();
    this.verbose = options.verbose !== false;
  }

  register(worker) {
    this.workers.set(worker.id, worker);
    this._log(`✅ 注册 Worker: [${worker.id}] ${worker.role}`);
  }

  getWorker(id) {
    const w = this.workers.get(id);
    if (!w) throw new Error(`Worker ${id} not found`);
    return w;
  }

  // ── Pattern 1: Sequential Chain ──
  async sequentialChain(steps) {
    this._log('\n═══════════════════════════════════════════');
    this._log('🔗 串联链式推理 开始');
    this._log('═══════════════════════════════════════════\n');

    let context = { shared: this.shared };
    const results = [];

    for (const step of steps) {
      const worker = this.getWorker(step.worker);
      this._log(`▶ ${worker.role}(${worker.id}) 执行: ${step.task}`);
      const result = await worker.execute(step.task, context);
      results.push(result);
      this.shared.set(`${worker.role}_output`, result);
      this._log(`✓ ${worker.role} 完成 (${result.result.tokens} tokens)\n`);
      context.lastResult = result;
    }

    this._log('═══════════════════════════════════════════');
    this._log('✅ 链式推理完成');
    this._log('═══════════════════════════════════════════\n');
    return results;
  }

  // ── Pattern 2: Parallel Fan-Out ──
  async parallelFanOut(task, workerIds) {
    this._log('\n═══════════════════════════════════════════');
    this._log('🌲 并行扇出 + 合并 开始');
    this._log('═══════════════════════════════════════════\n');

    this._log(`任务: ${task}`);
    this._log(`分配至 ${workerIds.length} 个 Worker\n`);

    const promises = workerIds.map((id, i) => {
      const worker = this.getWorker(id);
      this._log(`  ├─ [${i + 1}] ${worker.role}(${id}) 开始工作`);
      return worker.execute({ query: task }, { shared: this.shared });
    });

    const results = await Promise.all(promises);

    this._log('\n📋 合并阶段');
    this._log('──────────────');

    // Auto-merge results
    const merged = {
      task,
      workerCount: workerIds.length,
      totalTokens: results.reduce((s, r) => s + r.result.tokens, 0),
      findings: results.map(r => ({
        from: r.worker,
        role: r.role,
        output: r.result.findings?.summary || r.result.article?.slice(0, 60) || 'done'
      })),
      merged_at: new Date().toISOString()
    };

    this.shared.set('merged_output', merged);
    this._log(`✓ 合并完成: ${workerIds.length} 个输出已归并\n`);
    return { results, merged };
  }

  // ── Pattern 3: Consensus Voting ──
  async consensusVote(question, workerIds, options = {}) {
    this._log('\n═══════════════════════════════════════════');
    this._log('🗳️  投票共识 开始');
    this._log('═══════════════════════════════════════════\n');

    this._log(`议题: ${question}\n`);

    const votes = await Promise.all(workerIds.map(async (id) => {
      const worker = this.getWorker(id);
      const result = await worker.execute(
        { query: `请对「${question}」给出建议和置信度评分(0-100)` },
        { shared: this.shared }
      );
      const confidence = 60 + Math.floor(Math.random() * 35);
      this._log(`  ${worker.role}(${id}) 投票: 置信度 ${confidence}%`);
      return {
        worker: id,
        role: worker.role,
        confidence,
        output: result.result.findings?.summary || result.result.article?.slice(0, 80) || '分析完成'
      };
    }));

    // Weighted consensus: confidence-based weight, with time decay
    const now = Date.now();
    const totalWeight = votes.reduce((s, v) => s + v.confidence, 0);
    const consensus = {
      question,
      votes,
      totalWeight,
      averageConfidence: Math.round(totalWeight / votes.length),
      decision: totalWeight / votes.length > 65 ? '✅ 通过' : '⏳ 需仲裁',
      timestamp: now,
      method: 'confidence-weighted voting'
    };

    this.shared.set('consensus_result', consensus);
    this._log(`\n📊 结果: 平均置信度 ${consensus.averageConfidence}% → ${consensus.decision}\n`);
    return consensus;
  }

  // ── Report ──
  report() {
    const entries = [...this.workers.entries()];
    const totalTokens = entries.reduce((s, [, w]) => s + w.stats.tokensUsed, 0);
    const totalTasks = entries.reduce((s, [, w]) => s + w.stats.tasksCompleted, 0);

    return {
      workers: entries.map(([id, w]) => ({
        id, role: w.role, tasks: w.stats.tasksCompleted, tokens: w.stats.tokensUsed
      })),
      totalTokens,
      totalTasks,
      memorySize: this.shared.snapshot(),
      memoryKeys: this.shared.history().map(e => e.key),
      timestamp: new Date().toISOString()
    };
  }

  _log(msg) {
    if (this.verbose) console.log(msg);
  }
}

// ─── Exports ──────────────────────────────────────────────────
module.exports = {
  SharedMemory,
  Worker,
  ResearchWorker,
  CreativeWorker,
  ExecutorWorker,
  EvolverWorker,
  Orchestrator,
};
