const Icon = ({icon, className}) => {
  return <span className={`material-symbols-rounded ${className}`}>
      {icon}
  </span>
}

export default Icon