# ⚡ Cheat Sheet: Enterprise Multi-Agent Patterns & Circuit Breakers

| Pattern Topology | Coordination Mechanism | Primary Failure Risk | Mandatory Production Mitigation |
|---|---|---|---|
| **Supervisor-Worker** | Central Orchestrator delegates subtasks | Orchestrator bottleneck / Single point of failure | Asynchronous task queue + state persistence |
| **Peer-to-Peer Consensus** | $N$-instance concurrent voting / review | Inconclusive split-votes / token inflation | Tie-breaker rule + max 3 voting rounds |
| **Sequential Pipeline** | Linear stage-by-stage data transformation | Cascade failure on upstream syntax change | Intermediate schema validators between stages |
| **Dynamic Swarm** | Autonomous runtime agent discovery & delegation | Recursive loop death spiral & budget exhaustion | Monotonic depth counter ($\le 5$) + token circuit breaker |
