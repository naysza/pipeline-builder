// toolbar.js
import { DraggableNode } from './draggableNode';

const nodes = [
  { type: 'customInput', label: 'Input',       icon: '⬇️', color: '#34d399' },
  { type: 'customOutput', label: 'Output',     icon: '⬆️', color: '#f472b6' },
  { type: 'llm',          label: 'LLM',        icon: '🧠', color: '#a78bfa' },
  { type: 'text',         label: 'Text',       icon: '📝', color: '#fbbf24' },
  { type: 'apiCall',      label: 'API Call',   icon: '🌐', color: '#38bdf8' },
  { type: 'conditional',  label: 'If/Else',    icon: '🔀', color: '#fb923c' },
  { type: 'transform',    label: 'Transform',  icon: '⚙️', color: '#c084fc' },
  { type: 'merge',        label: 'Merge',      icon: '🔗', color: '#2dd4bf' },
  { type: 'note',         label: 'Note',       icon: '🗒️', color: '#94a3b8' },
];

export const PipelineToolbar = () => (
  <div
    style={{
      background: 'linear-gradient(to bottom, #0f1623, #131d2e)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap',
    }}
  >
    <span
      style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: 10,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: "'DM Mono', monospace",
        marginRight: 4,
      }}
    >
      Nodes
    </span>
    {nodes.map(n => (
      <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} color={n.color} />
    ))}
  </div>
);
