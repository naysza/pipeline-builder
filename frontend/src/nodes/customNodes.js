// customNodes.js
// Five new nodes built with BaseNode — demonstrating the abstraction's flexibility.

import { useState } from 'react';
import { BaseNode, FieldRow, NodeInput, NodeSelect, NodeTextarea } from './BaseNode';

// ─── 1. API Call Node ──────────────────────────────────────────────────────
export const APICallNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      accentColor="#38bdf8"
      inputs={[{ id: `${id}-body`, label: 'body' }]}
      outputs={[
        { id: `${id}-response`, label: 'response' },
        { id: `${id}-status`, label: 'status' },
      ]}
    >
      <FieldRow label="URL">
        <NodeInput value={url} onChange={e => setUrl(e.target.value)} placeholder="https://api.example.com/..." />
      </FieldRow>
      <FieldRow label="Method">
        <NodeSelect
          value={method}
          onChange={e => setMethod(e.target.value)}
          options={['GET', 'POST', 'PUT', 'DELETE'].map(m => ({ value: m, label: m }))}
        />
      </FieldRow>
    </BaseNode>
  );
};

// ─── 2. Conditional / Router Node ─────────────────────────────────────────
export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon="🔀"
      accentColor="#fb923c"
      inputs={[{ id: `${id}-input`, label: 'input' }]}
      outputs={[
        { id: `${id}-true`, label: 'true' },
        { id: `${id}-false`, label: 'false' },
      ]}
    >
      <FieldRow label="Condition">
        <NodeInput value={condition} onChange={e => setCondition(e.target.value)} placeholder='value === "yes"' />
      </FieldRow>
    </BaseNode>
  );
};

// ─── 3. Note / Comment Node ───────────────────────────────────────────────
export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="🗒️"
      accentColor="#94a3b8"
    >
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Add a comment or documentation..."
        rows={3}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 5,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 11,
          padding: '6px 8px',
          width: '100%',
          boxSizing: 'border-box',
          outline: 'none',
          fontFamily: 'inherit',
          resize: 'vertical',
          fontStyle: 'italic',
        }}
      />
    </BaseNode>
  );
};

// ─── 4. Data Transform Node ───────────────────────────────────────────────
export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || 'json_parse');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      accentColor="#c084fc"
      inputs={[{ id: `${id}-input`, label: 'input' }]}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
    >
      <FieldRow label="Operation">
        <NodeSelect
          value={transform}
          onChange={e => setTransform(e.target.value)}
          options={[
            { value: 'json_parse', label: 'JSON Parse' },
            { value: 'json_stringify', label: 'JSON Stringify' },
            { value: 'to_uppercase', label: 'To Uppercase' },
            { value: 'to_lowercase', label: 'To Lowercase' },
            { value: 'trim', label: 'Trim Whitespace' },
          ]}
        />
      </FieldRow>
    </BaseNode>
  );
};

// ─── 5. Merge / Combine Node ──────────────────────────────────────────────
export const MergeNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || '\\n');

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔗"
      accentColor="#2dd4bf"
      inputs={[
        { id: `${id}-a`, label: 'input A' },
        { id: `${id}-b`, label: 'input B' },
      ]}
      outputs={[{ id: `${id}-merged`, label: 'merged' }]}
    >
      <FieldRow label="Separator">
        <NodeInput value={separator} onChange={e => setSeparator(e.target.value)} placeholder="\n" />
      </FieldRow>
    </BaseNode>
  );
};
