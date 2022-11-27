import "../styles.css";

interface IExecutorProps {
  output: string;
}

const Executor: React.FC<IExecutorProps> = ({ output }: IExecutorProps) => {
  return (
    <div className="executor">
      {output}
    </div>
  );
};

export default Executor;
