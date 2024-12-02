import React from 'react';
import './home.css';
import { CodeXml } from 'lucide-react';

import AnswerCard from '../../components/AnswerCard/AnswerCard';

export default function Home() {
	return (
		<section className="home">
			<div className="home__container">
				<div>
					<h1 className="home__title">
						Welcome to the <span>Late Quiz!</span>
					</h1>
					<p className="home__sub">Pick a subject to get started</p>
				</div>
				<div className="home__choices">
					<AnswerCard category="Frontend" icon={<CodeXml />} />
					<AnswerCard category="Frontend" icon={<CodeXml />} />
					<AnswerCard category="Frontend" icon={<CodeXml />} />
					<AnswerCard category="Frontend" icon={<CodeXml />} />
				</div>
			</div>
		</section>
	);
}
