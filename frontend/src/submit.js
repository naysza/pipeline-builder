// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      const { num_nodes, num_edges, is_dag } = data;

      alert(
        `📊 Pipeline Analysis\n\n` +
        `Nodes:   ${num_nodes}\n` +
        `Edges:   ${num_edges}\n` +
        `Valid DAG: ${is_dag ? '✅ Yes' : '❌ No (contains a cycle)'}`
      );
    } catch (err) {
      alert(`Error connecting to backend:\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: '#0f1623',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '10px 32px',
          background: loading ? 'rgba(108,99,255,0.4)' : 'linear-gradient(135deg, #6C63FF, #a78bfa)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 13,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: '0.06em',
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: loading ? 'none' : '0 4px 20px rgba(108,99,255,0.4)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {loading ? 'Analyzing...' : '▶ Run Pipeline'}
      </button>
    </div>
  );
};
