// textNode.js
// Part 3: auto-resize + dynamic {{ variable }} handles

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = [];
  let match;
  const regex = new RegExp(VARIABLE_REGEX.source, 'g');
  while ((match = regex.exec(text)) !== null) {
    if (!vars.includes(match[1])) vars.push(match[1]);
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables on text change
  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
  }, [currText]);

  // Compute dynamic node width based on text length
  const nodeWidth = Math.min(400, Math.max(220, currText.length * 7 + 40));

  return (
    <div style={{ position: 'relative' }}>
      {/* Dynamic variable handles on the left — rendered outside BaseNode so we control positioning */}
      {variables.map((varName, i) => {
        const top = variables.length === 1
          ? '50%'
          : `${((i + 1) / (variables.length + 1)) * 100}%`;
        return (
          <div key={varName}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${varName}`}
              style={{
                top,
                background: '#fbbf24',
                width: 10,
                height: 10,
                border: '2px solid #1e2640',
                left: -6,
                position: 'absolute',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 10,
                top,
                transform: 'translateY(-50%)',
                fontSize: 9,
                color: 'rgba(251,191,36,0.7)',
                letterSpacing: '0.05em',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              {varName}
            </span>
          </div>
        );
      })}

      <BaseNode
        id={id}
        title="Text"
        icon="📝"
        accentColor="#fbbf24"
        outputs={[{ id: `${id}-output`, label: 'output' }]}
        style={{ minWidth: nodeWidth, transition: 'min-width 0.15s ease' }}
      >
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={e => setCurrText(e.target.value)}
          placeholder="Type text... use {{variable}} for inputs"
          rows={2}
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
            fontFamily: "'DM Mono', 'Fira Mono', monospace",
            resize: 'none',
            overflow: 'hidden',
            transition: 'height 0.1s ease',
          }}
        />
        {variables.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
            {variables.map(v => (
              <span key={v} style={{
                background: 'rgba(251,191,36,0.15)',
                border: '1px solid rgba(251,191,36,0.3)',
                borderRadius: 4,
                fontSize: 9,
                padding: '2px 6px',
                color: '#fbbf24',
              }}>
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </BaseNode>
    </div>
  );
};
