import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '[*] System initialised in high-availability mode.',
    '[✓] Connected to Qdrant vector index: arabic_legal_corpus',
    '[✓] Cluster inference engine ready: LLaMA 3 70B (P95: 380ms)'
  ]);
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRun = () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setLogs(prev => [...prev, `[>] User Query: "${prompt}"`, '[*] Dispatching job to multi-agent workflow...']);

    // Simulated streaming response
    setTimeout(() => {
      setLogs(prev => [...prev, '[✓] Stage 1 (Planner): Deconstructed prompt into 3 verification branches.']);
    }, 400);

    setTimeout(() => {
      setLogs(prev => [...prev, '[✓] Stage 2 (Retrieval): Extracted 4 relevant legal documents with Cross-Encoder score >= 0.89.']);
    }, 800);

    setTimeout(() => {
      setOutput('وفقاً لأحكام المواد المنظمة في النظام القانوني المعتمد، فإن الالتزامات التعاقدية تسري بفاعلية كاملة بين الأطراف، ويشترط استيفاء الشروط الشكلية والموضوعية المنصوص عليها نظاماً لتفادي الإبطال.');
      setLogs(prev => [...prev, '[✓] Completed: Stream finalized. Response audited for factual consistency.']);
      setIsProcessing(false);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            منصة الذكاء الاصطناعي المؤسسية | Enterprise AI Studio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            إدارة وتنسيق نماذج الذكاء الاصطناعي والعملاء المستقلين (Multi-Agent Orchestration)
          </p>
        </div>
        <div className="flex gap-4">
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            النظام متصل (P95: 380ms)
          </span>
        </div>
      </header>

      {/* Metrics Bar */}
      <div className="grid grid-cols-4 gap-4 my-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">الاستفسارات / ثانية</p>
          <p className="text-2xl font-bold text-white mt-1">38.5 QPS</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">زمن الاستجابة (P95)</p>
          <p className="text-2xl font-bold text-indigo-400 mt-1">412 ms</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">إنتاجية التوكنات</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">1,820 t/s</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400">استهلاك المعالجات (GPU)</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">74.2%</p>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-12 gap-6">
        {/* Input & Output */}
        <div className="col-span-7 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">إدخال المهمة أو الاستفسار</h2>
            <textarea
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500"
              placeholder="اكتب استفسارك هنا، مثلاً: ما هي شروط إنهاء عقد العمل محدد المدة والتعويضات المقررة نظاماً؟"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <button
              onClick={handleRun}
              disabled={isProcessing}
              className="mt-3 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-lg text-sm transition-all"
            >
              {isProcessing ? 'جاري المعالجة والاسترجاع...' : 'تشغيل تدفق العمل (Execute Pipeline)'}
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1">
            <h2 className="text-lg font-semibold mb-3">النتيجة المولدة والمدققة</h2>
            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-lg min-h-[160px] text-slate-200 text-sm leading-relaxed">
              {output || <span className="text-slate-600 italic">ستظهر النتيجة المولدة والموثقة بالمراجع هنا...</span>}
            </div>
          </div>
        </div>

        {/* Live Execution Logs */}
        <div className="col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-3">سجل تدفق العملاء الفوري (Live Agent Logs)</h2>
          <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded-lg p-4 font-mono text-xs overflow-y-auto space-y-2 max-h-[460px]">
            {logs.map((log, idx) => (
              <div key={idx} className="text-slate-300">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
