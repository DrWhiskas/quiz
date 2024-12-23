import React, { useState } from 'react';
import './questions.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import data from '../../data/quiz.json';
import Modal from '../../components/Modal/Modal';
import { log } from 'console';


export default function Questions() {
	const navigate = useNavigate()
	/* MODAL */
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState('');
	const [modalText, setModalText] = useState<React.ReactNode>(null);
	const [count, setCount] = useState(0)

	const [searchParams] = useSearchParams();
	const category = searchParams.get('category');
	const [rightAnswer, setRightAnswer] = useState(0);
	const [index, setIndex] = useState(0)

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
		}else{
			setTitleModal('Your score is:');
			setModalText(showScore(count));
			navigate('/home')
		}
	}

	function handleAnswerClick(answer: string) {
		const correctAnswer = questions[currentQuestionIndex].answer;
		if (answer === correctAnswer) {
			setCount(count+1)
			setRightAnswer(rightAnswer + 1);
			setTitleModal('Correct');
		} else {
			setTitleModal('WRONG');
		}
		console.log(count);
		setShowModal(true);
		setIndex(index+1)
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
	function showScore(userScore: number){
		return (
			<p>
				Your score is: <span>{userScore}</span>/20
			</p>
		);
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
