import pergunteiLogo from '../assets/images/perguntei-logo.png'
import instagramLogo from '../assets/images/instagram-logo.png';
import facebookLogo from '../assets/images/facebook-logo.png';
import '../styles/room-footer.scss';

export function Footer() {
    return (
        <div className="footer-container">
            <footer className="page-footer">
                <div className="footer-content logo">
                    <img width="" height="40" src={pergunteiLogo} alt="Perguntei?" />
                    <p>Perguntei é uma plataforma de salas online para criação de perguntas em tempo real, ideal pra você interagir com o seu público ao vivo.</p>
                </div>
                <div className="footer-content resources">
                    <h1>Recursos</h1>
                    <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated doc... <a target="_blank" href="https://opensource.org/licenses/MIT">Saiba mais</a></p>
                </div>
                <div className="footer-content icons">
                    <h1>Contato</h1>
                    <div className="footer-icons">
                    <a href="https://facebook.com" target="_blank"><img height="30px" src={facebookLogo} /></a>
                    <a href="https://github.com/brunofilho1" target="_blank"><img height="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" /></a>
                    <a href="https://twitter.com" target="_blank"><img height="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" /></a>
                    <a href="https://instagram.com" target="_blank"><img height="30px" src={instagramLogo} /></a>
                    </div>
                    <p>Entre em contato com o desenvolvedor responsável.</p>
                </div>
            </footer>
        </div>
    )
}