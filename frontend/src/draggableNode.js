// draggableNode.js
export const DraggableNode = ({ type, label, icon = '', color = '#6C63FF' }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.opacity = '0.6';
  };

  return (
    <div
      className={type}
      onDragStart={e => onDragStart(e, type)}
      onDragEnd={e => (e.target.style.opacity = '1')}
      draggable
      title={`Drag to add ${label} node`}
      style={{
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 7,
        border: `1px solid ${color}33`,
        borderLeft: `3px solid ${color}`,
        background: 'rgba(255,255,255,0.04)',
        transition: 'background 0.15s, transform 0.1s',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${color}18`;
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      <span style={{
        color: '#e2e8f0',
        fontSize: 11,
        fontFamily: "'DM Mono', monospace",
        letterSpacing: '0.04em',
      }}>
        {label}
      </span>
    </div>
  );
};
