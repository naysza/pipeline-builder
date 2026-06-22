// outputNode.js

import { useState } from 'react';
import { BaseNode, FieldRow, NodeInput, NodeSelect } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="⬆️"
      accentColor="#f472b6"
      inputs={[{ id: `${id}-value`, label: 'value' }]}
    >
      <FieldRow label="Name">
        <NodeInput value={currName} onChange={e => setCurrName(e.target.value)} placeholder="output_name" />
      </FieldRow>
      <FieldRow label="Type">
        <NodeSelect
          value={outputType}
          onChange={e => setOutputType(e.target.value)}
          options={[{ value: 'Text', label: 'Text' }, { value: 'Image', label: 'Image' }]}
        />
      </FieldRow>
    </BaseNode>
  );
};
