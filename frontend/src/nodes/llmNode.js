// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🧠"
      accentColor="#a78bfa"
      inputs={[
        { id: `${id}-system`, label: 'system' },
        { id: `${id}-prompt`, label: 'prompt' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'response' }]}
    >
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
        Language model inference
      </span>
    </BaseNode>
  );
};
