#!/usr/bin/env node

/**
 * 🐝 Agent Swarm — Interactive Demo
 * 
 * Run: node demo.js
 * 
 * Demonstrates all three collaboration patterns:
 *   1. Sequential Chain  — Research → Creative → Executor
 *   2. Parallel Fan-Out  — Market analysis from 3 perspectives
 *   3. Consensus Voting  — 4 workers vote on a pricing decision
 */

const {
  Orchestrator,
  ResearchWorker,
  CreativeWorker,
  ExecutorWorker,
  EvolverWorker,
} = require('./src/swarm-core');

function divider(char = '═', width = 56) {
  console.log(`\n  ${char.repeat(width)}\n`);
}

async function main() {
  console.clear();
  console.log(`
  ╔════════════════════════════════════════════════════╗
  ║                                                    ║
  ║     🐝  Agent Swarm · 智能体蜂群  MVP Demo        ║
  ║                                                    ║
  ║     三种协作模式 · 可运行 · 无外部依赖              ║
  ║                                                    ║
  ╚════════════════════════════════════════════════════╝
  `);

  // ─── 1. Register Workers ──────────────────────────────────
  console.log('  📦 注册 Worker 蜂群...\n');

  const swarm = new Orchestrator({ name: '蜂后-Alpha' });
  swarm.register(new ResearchWorker('researcher-1'));
  swarm.register(new CreativeWorker('writer-1'));
  swarm.register(new ExecutorWorker('deployer-1'));
  swarm.register(new EvolverWorker('evolver-1'));
  swarm.register(new ResearchWorker('researcher-2'));
  swarm.register(new ResearchWorker('researcher-3'));

  console.log(`  🐝 共 6 个 Worker 注册完成`);
  divider();

  // ─── 2. Pattern 1: Sequential Chain ───────────────────────
  console.log('  📌 场景一：串联链式推理');
  console.log('  ──────────────────────\n');
  console.log('  任务：市场调研 → 撰写报告 → 发布上线\n');
  console.log('  流程: 📊 Research ──→ ✍️ Creative ──→ 🚀 Executor\n');

  await swarm.sequentialChain([
    {
      worker: 'researcher-1',
      task: { query: '2026年AI Agent市场分析' }
    },
    {
      worker: 'writer-1',
      task: { topic: '2026 AI Agent 市场趋势报告' }
    },
    {
      worker: 'deployer-1',
      task: { action: '部署网站', description: '发布市场报告' }
    }
  ]);

  divider();

  // ─── 3. Pattern 2: Parallel Fan-Out ───────────────────────
  console.log('  📌 场景二：并行扇出 + 合并');
  console.log('  ──────────────────────────\n');
  console.log('  任务：对一个新市场机会从三个角度同时分析\n');
  console.log('  流程:\n');
  console.log('        ┌── Agent A (财务) ──┐');
  console.log('    📡 ──┼── Agent B (市场) ──┼── 📋 合并报告');
  console.log('        └── Agent C (产品) ──┘\n');

  await swarm.parallelFanOut(
    '2026智能体蜂群产品市场机遇',
    ['researcher-1', 'researcher-2', 'researcher-3']
  );

  divider();

  // ─── 4. Pattern 3: Consensus Voting ───────────────────────
  console.log('  📌 场景三：投票共识机制');
  console.log('  ──────────────────────\n');
  console.log('  议题：新产品定价策略\n');
  console.log('  4 个 Worker 独立给出建议 + 置信度，加权投票\n');

  await swarm.consensusVote(
    '新产品智能体蜂群 Orchestrator 的定价方案：¥199/月 vs ¥499/月 vs 免费增值',
    ['researcher-1', 'writer-1', 'deployer-1', 'evolver-1']
  );

  divider('●', 56);

  // ─── 5. Final Report ──────────────────────────────────────
  console.log('  📊 蜂群运行报告\n');

  const report = swarm.report();

  console.log(`  🐝 Worker 统计:`);
  console.log(`  ─────────────────────────────────────────────`);
  report.workers.forEach(w => {
    const bar = '█'.repeat(Math.ceil(w.tasks * 4));
    console.log(`  ${w.role.padEnd(12)} ${bar}  ${w.tasks} 任务 · ${w.tokens} tokens`);
  });

  console.log(`\n  📈 汇总:`);
  console.log(`  总任务数:   ${report.totalTasks}`);
  console.log(`  总 Tokens:  ${report.totalTokens}`);
  console.log(`  共享内存键: ${report.memoryKeys.length}`);

  console.log(`\n  🧠 共享内存内容:`);
  Object.entries(report.memorySize).forEach(([k, v]) => {
    const summary = typeof v === 'object' ? JSON.stringify(v).slice(0, 80) + '...' : String(v).slice(0, 80);
    console.log(`  📌 ${k}: ${summary}`);
  });

  divider('●', 56);
  console.log('  ✅ 演示完成！三种协作模式均已验证。\n');
  console.log('  🔗 https://github.com/yunduanjt/agent-swarm\n');
}

main().catch(e => {
  console.error('  ❌ 错误:', e.message);
  process.exit(1);
});
