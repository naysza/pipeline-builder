// inputNode.js

import { useState } from 'react';
import { BaseNode, FieldRow, NodeInput, NodeSelect } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="⬇️"
      accentColor="#34d399"
      outputs={[{ id: `${id}-value`, label: 'value' }]}
    >
      <FieldRow label="Name">
        <NodeInput value={currName} onChange={e => setCurrName(e.target.value)} placeholder="input_name" />
      </FieldRow>
      <FieldRow label="Type">
        <NodeSelect
          value={inputType}
          onChange={e => setInputType(e.target.value)}
          options={[{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }]}
        />
      </FieldRow>
    </BaseNode>
  );
};
