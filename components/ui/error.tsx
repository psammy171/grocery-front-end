interface Props {
  message: string;
}

const Error = ({ message }: Props) => (
  <p className="text-sm text-right mx-1 text-error">{message}</p>
);
export default Error;
