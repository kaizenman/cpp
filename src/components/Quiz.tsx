import { useEffect, useState } from "react";
import { QuizChallenge } from "../challenges";
import { Form } from "react-router-dom";
import { Button, FormCheck } from "react-bootstrap";


interface IQuizProps {
  theme: string;
  challenge: QuizChallenge;
  onSolved: (solved: boolean) => void;
}


export const Quiz: React.FC<IQuizProps> = ({ theme, challenge, onSolved }: IQuizProps) => {
  const [items, setItems] = useState([
    { id: 0, text: challenge.answers[0], selected: true},
    ...challenge.answers.slice(1).map((answer, idx) => ({
      id: idx + 1,
      text: answer,
      selected: false
    }))
  ])

  const [activeItem, setActiveItem] = useState(0);

  function handleSelect(id: number) {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, selected: true }
      } else {
        return { ...item, selected: false }
      }
    }))
    setActiveItem(id);
  }

  useEffect(() => {
    setActiveItem(0);
    setItems([
      { id: 0, text: challenge.answers[0], selected: true},
      ...challenge.answers.slice(1).map((answer, idx) => ({
        id: idx + 1,
        text: answer,
        selected: false
      }))
    ])
  }, [challenge])

  return (
    <div className="form-check">
      <h1>Quiz</h1>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <div>
        <h2> Question </h2>
        <p>{challenge.question}</p>
      </div>
      <Form>
        {items.map((answer, idx) => (
          <div key={answer.id} className="mb-3">
            <FormCheck 
              type="radio"
              id={answer.id.toString()}
              checked={answer.selected}
              onChange={() => handleSelect(idx)}
              label={answer.text} />
          </div>
        ))}        
      </Form>
      <div className="mt-2">
        <Button variant="outline-primary" onClick={() => {
          console.log('Correct answer is ', challenge.correct_answer)
          console.log('Active item is ', activeItem) 
          onSolved(activeItem === challenge.correct_answer)}
        }>Submit</Button>
      </div>
    </div>
  );
}
