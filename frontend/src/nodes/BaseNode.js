// BaseNode.js
// Core abstraction for all pipeline nodes.
// Usage: pass title, fields, inputs (handles on left), outputs (handles on right).

import { Handle, Position } from 'reactflow';

/**
 * BaseNode
 * @param {string}  id           - ReactFlow node id
 * @param {string}  title        - Label shown in the node header
 * @param {string}  icon         - Emoji or short text icon shown beside the title
 * @param {string}  accentColor  - CSS color string for the left border accent
 * @param {Array}   inputs       - [{ id, label }]  left-side target handles
 * @param {Array}   outputs      - [{ id, label }]  right-side source handles
 * @param {node}    children     - Body content (fields, labels, etc.)
 */
export const BaseNode = ({
  id,
  title,
  icon = '',
  accentColor = '#6C63FF',
  inputs = [],
  outputs = [],
  children,
  style = {},
}) => {
  const minHeight = Math.max(80, Math.max(inputs.length, outputs.length) * 36 + 56);

  return (
    <div
      style={{
        minWidth: 220,
        minHeight,
        background: 'linear-gradient(145deg, #1e2640, #161c30)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 10,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)`,
        fontFamily: "'DM Mono', 'Fira Mono', monospace",
        color: '#e2e8f0',
        position: 'relative',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '8px 8px 0 0',
        }}
      >
        {icon && (
          <span style={{ fontSize: 14 }}>{icon}</span>
        )}
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accentColor,
          }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>

      {/* Left (target) handles */}
      {inputs.map((handle, i) => {
        const top = inputs.length === 1
          ? '50%'
          : `${((i + 1) / (inputs.length + 1)) * 100}%`;
        return (
          <div key={handle.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={handle.id}
              style={{
                top,
                background: accentColor,
                width: 10,
                height: 10,
                border: '2px solid #1e2640',
                left: -6,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 10,
                top,
                transform: 'translateY(-50%)',
                fontSize: 9,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.05em',
                pointerEvents: 'none',
              }}
            >
              {handle.label}
            </span>
          </div>
        );
      })}

      {/* Right (source) handles */}
      {outputs.map((handle, i) => {
        const top = outputs.length === 1
          ? '50%'
          : `${((i + 1) / (outputs.length + 1)) * 100}%`;
        return (
          <div key={handle.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={handle.id}
              style={{
                top,
                background: accentColor,
                width: 10,
                height: 10,
                border: '2px solid #1e2640',
                right: -6,
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: 10,
                top,
                transform: 'translateY(-50%)',
                fontSize: 9,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.05em',
                pointerEvents: 'none',
                textAlign: 'right',
              }}
            >
              {handle.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Shared field components ───────────────────────────────────────────────

export const NodeLabel = ({ children }) => (
  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    {children}
  </span>
);

export const NodeInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 5,
      color: '#e2e8f0',
      fontSize: 12,
      padding: '4px 8px',
      width: '100%',
      boxSizing: 'border-box',
      outline: 'none',
      fontFamily: 'inherit',
    }}
  />
);

export const NodeSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      background: '#1e2640',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 5,
      color: '#e2e8f0',
      fontSize: 12,
      padding: '4px 8px',
      width: '100%',
      outline: 'none',
      fontFamily: 'inherit',
      cursor: 'pointer',
    }}
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export const NodeTextarea = ({ value, onChange, placeholder, style = {} }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 5,
      color: '#e2e8f0',
      fontSize: 12,
      padding: '6px 8px',
      width: '100%',
      boxSizing: 'border-box',
      outline: 'none',
      fontFamily: 'inherit',
      resize: 'none',
      ...style,
    }}
  />
);

export const FieldRow = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <NodeLabel>{label}</NodeLabel>
    {children}
  </div>
);
