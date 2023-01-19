const Icon = ({icon, className, onClick}) => {
  return <span className={`material-symbols-rounded ${className}`} onClick={onClick}>
      {icon}
  </span>
}

export default Icon