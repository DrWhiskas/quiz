import React, { ReactNode } from "react";
import './modal.css'
import { X } from "lucide-react";



interface modalProps{
    title: string,
    text?: ReactNode
    NextQuestion: () =>void
}

export default function Modal({...props}: modalProps){
    return (
			<section className="modal">
				<div className="modal__content">
					<h2 className="modal__content__title">{props.title}</h2>
					<p className="modal__content__text">{props.text}</p>
					<button className="modal__btn" onClick={props.NextQuestion}>
						Next Question
					</button>
				</div>
			</section>
		);
}