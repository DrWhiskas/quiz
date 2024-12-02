import React, {ReactNode} from 'react';
import './answerCard.css';

interface AnswerProps {
	icon: ReactNode;
	category: string;
}

export default function AnswerCard({...props}: AnswerProps) {
	return (
		<article className="answerCard">
			<div className="answerCard__icon">{props.icon}</div>
			<h2 className="answerCard__title">{props.category}</h2>
		</article>
	);
}
