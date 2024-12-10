import React, { useState } from 'react';
import './questions.css';
import { useSearchParams } from 'react-router-dom';
import data from '../../data/quiz.json';
import Modal from '../../components/Modal/Modal';
import { log } from 'console';

export default function Questions() {
	/* MODAL */
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [modalText, setModalText] = useState<React.ReactNode>(null);

	const [searchParams] = useSearchParams();
	const category = searchParams.get('category');
	const [rightAnswer, setRightAnswer] = useState(0);

	const categoryNames = Object.keys(data.categories);
	const isValidCategory = categoryNames.includes(category || '');
	const questions = isValidCategory
		? data.categories[category as keyof typeof data.categories]
		: [];
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// function to go to the next question
	function goToNextQuestion() {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setShowModal(false);
		}
	}

	function handleAnswerClick(answer: string) {
		const correctAnswer = questions[currentQuestionIndex].answer;
		if (answer === correctAnswer) {
			setRightAnswer(rightAnswer + 1);
			setTitleModal('Correct');
		} else {
			setTitleModal('WRONG');
		}
		setShowModal(true);
		setModalText(answerText(answer));
	}
	function answerText(selectedAnswer: string) {
		const correctAnswer = questions[currentQuestionIndex].answer;
		if (selectedAnswer === correctAnswer) {
			return <p>{selectedAnswer} is the correct option</p>;
		} else {
			return <p>{correctAnswer} is the correct option</p>;
		}
	}
	return (
		<section className="questions">
			<div className="questions__container">
				{isValidCategory ? (
					<>
						<h1>
							Question {currentQuestionIndex + 1} / {questions.length}
						</h1>
						<p>{questions[currentQuestionIndex].question}</p>
						<ul className="questions__container__option">
							{questions[currentQuestionIndex].options.map((option, index) => (
								<li className="questions__container__option__item" key={index}>
									<button
										className="item__btn"
										onClick={() => handleAnswerClick(option)}
									>
										{option}
									</button>
								</li>
							))}
						</ul>
					</>
				) : (
					<p>Catégorie non valide</p>
				)}
			</div>
			{showModal && (
				<Modal
					title={titleModal}
					text={modalText}
					NextQuestion={goToNextQuestion}
				/>
			)}
		</section>
	);
}
