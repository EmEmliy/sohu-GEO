const tagStyles = {
  default: 'bg-orange-50 text-orange-600 border-orange-100',
  primary: 'bg-orange-500 text-white border-orange-500',
  success: 'bg-green-50 text-green-600 border-green-100',
  warning: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  info: 'bg-blue-50 text-blue-600 border-blue-100',
  pink: 'bg-pink-50 text-pink-600 border-pink-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
}

const tagSizes = {
  sm: 'px-2 py-0.5 text-xs whitespace-nowrap',
  md: 'px-2.5 py-0.5 text-xs whitespace-nowrap',
  lg: 'px-3 py-1 text-sm whitespace-nowrap',
}

export default function Tag({ children, style = 'default', size = 'md', icon }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${tagStyles[style]} ${tagSizes[size]}`}
    >
      {icon && <span className="text-xs">{icon}</span>}
      {children}
    </span>
  )
}

export function TagList({ tags, max = 3, style = 'default', size = 'md' }) {
  const displayTags = tags.slice(0, max)
  const remaining = tags.length - max

  return (
    <div className="flex flex-wrap gap-1">
      {displayTags.map((tag, index) => (
        <Tag key={index} style={style} size={size}>
          {tag}
        </Tag>
      ))}
      {remaining > 0 && (
        <span className="text-xs text-gray-400 self-center">+{remaining}</span>
      )}
    </div>
  )
}
