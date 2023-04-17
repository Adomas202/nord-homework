interface Props {
  text: string;
  className?: string;
}

const Heading = ({
  text,
  className = "text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",
}: Props) => <h1 className={className}>{text}</h1>;

export default Heading;
