import React, { useState } from 'react';
import './questions.css';
import { useSearchParams } from 'react-router-dom';
import data from '../../data/quiz.json';
import Modal from '../../components/Modal/Modal';
import { log } from 'console';

export default function Questions() {
	/* MODAL */
	const [showModal, setShowModal] = useState(false)
	const [titleModal, setTitleModal] = useState('')

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
 function goToNextQuestion(){
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			setShowModal(false);
		}
 };

  function handleAnswerClick(answer: string){
		const correctAnswer = questions[currentQuestionIndex].answer;
		if (answer === correctAnswer) {
			setRightAnswer(rightAnswer + 1)
			setTitleModal('Correct')
		} else {
			setTitleModal('WRONG');
		}	
		setShowModal(true)	
	};
	return (
		<section className="questions">

			  <div>
      {isValidCategory ? (
        <>
          <h1>Question {currentQuestionIndex + 1} / {questions.length}</h1>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleAnswerClick(option)}>{option}</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Catégorie non valide</p>
      )}
    </div>
	{showModal && (
		<Modal title={titleModal} NextQuestion={goToNextQuestion} />
	)}
	</section>
	);
}


/*
<>
					<h1>Questions pour la catégorie: {category}</h1>
					<ul>
						{questions.map((item, index) => (
							<li key={index}>
								<p>{item.question}</p>
								<ul>
									{item.options.map((option, i) => (
										<li key={i}>{option}</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</>
			) : (
				<p>Catégorie non valide</p>
			)}
				*/