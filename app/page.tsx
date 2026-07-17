"use client";

import { useMemo, useState } from "react";

type View = "register" | "conflicts" | "questions" | "automation";

const sources = [
  { id: "SRC-001", title: "Flexible Work Policy", type: "Policy", date: "Jun 15, 2026", owner: "People Ops", authority: "Approved", status: "Current", accent: "blue", excerpt: "Team members may work remotely up to two days per week with manager approval." },
  { id: "SRC-002", title: "Supervisor Update", type: "Email", date: "Jul 8, 2026", owner: "Operations", authority: "Informal", status: "Review", accent: "amber", excerpt: "Starting immediately, teams may work remotely three days each week. No separate approval is needed." },
  { id: "SRC-003", title: "New Hire Checklist", type: "Checklist", date: "May 20, 2026", owner: "People Ops", authority: "Operational", status: "Current", accent: "blue", excerpt: "Submit reimbursable receipts within 10 calendar days of purchase." },
  { id: "SRC-004", title: "Expense Processing Memo", type: "Memo", date: "Jun 28, 2026", owner: "Finance", authority: "Approved", status: "Current", accent: "blue", excerpt: "Receipts are accepted up to 30 calendar days after purchase." },
  { id: "SRC-005", title: "Operations Handbook", type: "Handbook", date: "Apr 2, 2026", owner: "Compliance", authority: "Approved", status: "Current", accent: "blue", excerpt: "Operational incidents must be reported before the end of the same shift." },
  { id: "SRC-006", title: "Team Guidance Thread", type: "Chat", date: "Jul 11, 2026", owner: "Operations", authority: "Informal", status: "Review", accent: "amber", excerpt: "File the incident note by the end of the next business day." },
];

const conflicts = [
  { id: "CON-001", topic: "Remote work eligibility", risk: "High", left: sources[0], right: sources[1], issue: "Approved policy requires manager approval and limits remote work to two days; a later informal email allows three days without approval.", question: "Does the July 8 supervisor update amend the approved Flexible Work Policy?" },
  { id: "CON-002", topic: "Receipt submission window", risk: "Medium", left: sources[2], right: sources[3], issue: "Two active instructions specify different receipt deadlines: 10 days and 30 days.", question: "Which receipt deadline governs new hires, and should the checklist be revised?" },
  { id: "CON-003", topic: "Incident reporting deadline", risk: "High", left: sources[4], right: sources[5], issue: "The approved handbook requires same-shift reporting; informal team guidance permits the next business day.", question: "Should teams follow the handbook until Compliance issues an approved revision?" },
];

const automation = [
  { name: "Source intake & metadata", stage: "Ready to pilot", effort: "Low", risk: "Low", control: "Human confirms owner and authority" },
  { name: "Conflict candidate detection", stage: "Ready to pilot", effort: "Medium", risk: "Medium", control: "Human validates every flagged conflict" },
  { name: "Clarification request drafting", stage: "Design next", effort: "Low", risk: "Medium", control: "Owner approves before sending" },
  { name: "Policy change propagation", stage: "Hold", effort: "High", risk: "High", control: "No automatic updates or enforcement" },
];

const icons: Record<string, string> = {
  Policy: "§", Email: "↗", Checklist: "✓", Memo: "≡", Handbook: "▣", Chat: "••",
};

export default function Home() {
  const [view, setView] = useState<View>("register");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(sources[0]);
  const [running, setRunning] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const filtered = useMemo(() => sources.filter((source) =>
    (source.title + source.type + source.owner + source.excerpt).toLowerCase().includes(query.toLowerCase())
  ), [query]);

  function runAnalysis() {
    setRunning(true);
    setAnalyzed(false);
    window.setTimeout(() => {
      setRunning(false);
      setAnalyzed(true);
      setView("conflicts");
    }, 1250);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Clarity Ledger home">
          <span className="brandMark"><i /><i /><i /></span>
          <span>Clarity Ledger</span>
        </a>
        <div className="org"><span>DEMO WORKSPACE</span><strong>Harborlight Community Services</strong></div>
        <div className="topActions">
          <div className="safe"><span>●</span> Synthetic data only</div>
          <button className="runButton" onClick={runAnalysis} disabled={running}>
            {running ? <><span className="spinner" /> Analyzing evidence…</> : "Run evidence analysis"}
          </button>
        </div>
      </header>

      <div id="top" className="shell">
        <aside className="sidebar">
          <div className="sideIntro">
            <div className="eyebrow">Evidence workspace</div>
            <h1>Every instruction has a source.</h1>
            <p>Every conflict has a trail.</p>
          </div>
          <label className="search">
            <span>⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search evidence" aria-label="Search evidence" />
          </label>
          <div className="sourceHeading"><span>Source stack</span><b>{filtered.length}</b></div>
          <div className="sourceList">
            {filtered.map((source) => (
              <button key={source.id} className={"sourceItem " + (selected.id === source.id ? "active" : "")} onClick={() => setSelected(source)}>
                <span className={"docIcon " + source.accent}>{icons[source.type]}</span>
                <span><strong>{source.title}</strong><small>{source.type} · {source.date}</small></span>
                {source.status === "Review" && <em>!</em>}
              </button>
            ))}
          </div>
          <div className="sideNote">
            <span>◈</span>
            <div><strong>Evidence-preserving</strong><p>Clarity Ledger surfaces ambiguity. It does not make policy or personnel decisions.</p></div>
          </div>
        </aside>

        <section className="workspace">
          <div className="welcome">
            <div>
              <div className="eyebrow">Operational clarity, with receipts</div>
              <h2>Know what changed, what conflicts, and who needs to decide.</h2>
            </div>
            {analyzed && <div className="analysisDone">✓ Analysis complete · 3 conflicts found</div>}
          </div>

          <div className="metrics">
            <Metric value="6" label="Sources indexed" detail="Across 5 document types" />
            <Metric value="3" label="Conflicts detected" detail="2 high-risk" alert />
            <Metric value="3" label="Open clarifications" detail="Awaiting owner review" />
            <Metric value="4" label="Automation candidates" detail="2 ready to pilot" />
          </div>

          <nav className="tabs" aria-label="Workspace sections">
            <Tab id="register" label="Source register" count={6} current={view} set={setView} />
            <Tab id="conflicts" label="Contradictions" count={3} current={view} set={setView} alert />
            <Tab id="questions" label="Clarification queue" count={3} current={view} set={setView} />
            <Tab id="automation" label="Automation map" count={4} current={view} set={setView} />
          </nav>

          {view === "register" && (
            <section className="panel">
              <div className="panelHead">
                <div><h3>Source register</h3><p>A dated, attributable record of operational guidance.</p></div>
                <span className="pill">Last analyzed · Jul 17, 2026</span>
              </div>
              <div className="registerGrid">
                <div className="tableWrap">
                  <table>
                    <thead><tr><th>Source</th><th>Authority</th><th>Owner</th><th>Status</th></tr></thead>
                    <tbody>{filtered.map((source) => (
                      <tr key={source.id} className={selected.id === source.id ? "selected" : ""} onClick={() => setSelected(source)}>
                        <td><div className="tableTitle"><span className={"docIcon small " + source.accent}>{icons[source.type]}</span><div><strong>{source.title}</strong><small>{source.id} · {source.date}</small></div></div></td>
                        <td><span className={"authority " + (source.authority === "Informal" ? "warn" : "")}>{source.authority}</span></td>
                        <td>{source.owner}</td>
                        <td><span className={"status " + source.status.toLowerCase()}>{source.status}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <aside className="detail">
                  <div className="detailTop"><span className={"docIcon large " + selected.accent}>{icons[selected.type]}</span><span className="status current">{selected.status}</span></div>
                  <h4>{selected.title}</h4>
                  <dl><div><dt>Source ID</dt><dd>{selected.id}</dd></div><div><dt>Owner</dt><dd>{selected.owner}</dd></div><div><dt>Authority</dt><dd>{selected.authority}</dd></div><div><dt>Effective</dt><dd>{selected.date}</dd></div></dl>
                  <blockquote>“{selected.excerpt}”</blockquote>
                  <p className="citation">Cited excerpt · preserved verbatim for this synthetic demo</p>
                </aside>
              </div>
            </section>
          )}

          {view === "conflicts" && (
            <section className="panel">
              <div className="panelHead"><div><h3>Contradiction workbench</h3><p>Compare claims in context before anyone acts on them.</p></div><span className="guardrail">◇ Do not infer</span></div>
              <div className="conflictList">{conflicts.map((conflict) => (
                <article className="conflictCard" key={conflict.id}>
                  <div className="conflictMeta"><span>{conflict.id}</span><strong>{conflict.topic}</strong><b className={"risk " + conflict.risk.toLowerCase()}>{conflict.risk} risk</b></div>
                  <div className="compare">
                    <Evidence label="Source A" source={conflict.left} />
                    <div className="versus">≠</div>
                    <Evidence label="Source B" source={conflict.right} />
                  </div>
                  <div className="finding"><span>!</span><div><strong>Why this needs review</strong><p>{conflict.issue}</p></div></div>
                  <div className="questionRow"><div><small>CLARIFICATION NEEDED</small><p>{conflict.question}</p></div><button onClick={() => setView("questions")}>Route to owner →</button></div>
                </article>
              ))}</div>
            </section>
          )}

          {view === "questions" && (
            <section className="panel">
              <div className="panelHead"><div><h3>Clarification queue</h3><p>Decision-ready questions, linked to the evidence that created them.</p></div><span className="pill">3 awaiting review</span></div>
              <div className="questionList">{conflicts.map((item, index) => (
                <article className="queueItem" key={item.id}>
                  <div className="queueNumber">0{index + 1}</div>
                  <div className="queueBody"><div><span className={"risk " + item.risk.toLowerCase()}>{item.risk} risk</span><small>{item.left.owner} + {item.right.owner}</small></div><h4>{item.question}</h4><p>Evidence: {item.left.id} ↔ {item.right.id}</p></div>
                  <div className="queueState"><span>Awaiting owner</span><button>Prepare brief</button></div>
                </article>
              ))}</div>
            </section>
          )}

          {view === "automation" && (
            <section className="panel">
              <div className="panelHead"><div><h3>Safe automation map</h3><p>Start with reversible assistance; preserve human authority.</p></div><span className="guardrail">Human approval required</span></div>
              <div className="automationGrid">{automation.map((item, index) => (
                <article className="autoCard" key={item.name}>
                  <div className="autoTop"><span>0{index + 1}</span><b className={item.stage === "Hold" ? "hold" : ""}>{item.stage}</b></div>
                  <h4>{item.name}</h4>
                  <div className="tags"><span>Effort · {item.effort}</span><span>Risk · {item.risk}</span></div>
                  <div className="control"><small>CONTROL</small><p>{item.control}</p></div>
                </article>
              ))}</div>
            </section>
          )}
          <footer><span>Clarity Ledger · OpenAI Build Week 2026</span><span>Built with Codex + GPT-5.6 · Synthetic demonstration</span></footer>
        </section>
      </div>
    </main>
  );
}

function Metric({ value, label, detail, alert = false }: { value: string; label: string; detail: string; alert?: boolean }) {
  return <div className={"metric " + (alert ? "metricAlert" : "")}><div><strong>{value}</strong>{alert && <span>!</span>}</div><b>{label}</b><small>{detail}</small></div>;
}

function Tab({ id, label, count, current, set, alert = false }: { id: View; label: string; count: number; current: View; set: (id: View) => void; alert?: boolean }) {
  return <button className={current === id ? "active" : ""} onClick={() => set(id)}>{label}<span className={alert ? "tabAlert" : ""}>{count}</span></button>;
}

function Evidence({ label, source }: { label: string; source: typeof sources[number] }) {
  return <div className="evidence"><div><small>{label}</small><span>{source.authority}</span></div><h4>{source.title}</h4><p>“{source.excerpt}”</p><footer>{source.id} · {source.date} · {source.owner}</footer></div>;
}