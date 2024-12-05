import React, { useState } from 'react';
import './home.css';
import { CodeXml } from 'lucide-react';
import { Link } from 'react-router-dom';

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
					<Link to="/questions?category=Frontend">
						<AnswerCard category="Frontend" icon={<CodeXml />} />
					</Link>
					<Link to="/questions?category=Sport">
						<AnswerCard category="Sport" icon={<CodeXml />} />
					</Link>
					<Link to="/questions?category=Esport">
						<AnswerCard category="Esport" icon={<CodeXml />} />
					</Link>
					<Link to="/questions?category=Asian Culture">
						<AnswerCard category="Asian Culture" icon={<CodeXml />} />
					</Link>
				</div>
			</div>
		</section>
	);
}
