import classNames from "classnames"

const variants = {
  primary:
    "bg-blue-600 active:bg-blue-700 text-white text-white border-2 border-blue-800",
  clear: "",
}
const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-1.5 font-semibold text-body",
  lg: "px-4 py-2 font-bold text-lg",
}

const Button = (props) => {
  const { variant = "clear", size = "md", ...otherProps } = props

  return (
    <button
      className={classNames("rounded-lg p-2", variants[variant], sizes[size])}
      {...otherProps}
    />
  )
}

export default Button
