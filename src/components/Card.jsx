export default function Card({
  title,
  children,
  className = "",
  titleClassName = "",
  bodyClassName = "",
  as: Component = "div",
}) {
  return (
    <Component
      className={[
        "bg-white/80 backdrop-blur-sm rounded-xl3 p-5 shadow-soft",
        className,
      ].join(" ")}
    >
      {title ? (
        <div className={["text-lg font-semibold mb-2", titleClassName].join(" ")}>
          {title}
        </div>
      ) : null}

      <div className={bodyClassName}>{children}</div>
    </Component>
  );
}
