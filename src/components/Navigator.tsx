
import { challenges, IChallenge } from "../challenges";
import "../styles.css";

interface INavigatorProps {
  onChange: (challenge: IChallenge) => void;
}

const Navigator: React.FC<INavigatorProps> = ({onChange}: INavigatorProps) => {
  return (
    <div className="navigator">
      <ul>
        {challenges.map(challenge => 
        
        <li onClick={(e) => {
          onChange(challenge); 
        }} key={challenge.id}>
        {challenge.title}
        </li>)}</ul>
    </div>
  );
};

export default Navigator;
