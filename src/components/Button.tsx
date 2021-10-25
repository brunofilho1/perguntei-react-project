import {ButtonHTMLAttributes} from 'react'; // tipagem que declara todos atributos que o botão pode receber

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; //as propriedades do botão são todas do ButtonHTMLAttributes, passando apenas o elemento global do botão

export function Button(props: ButtonProps) {
    return (
        <button className="button" {...props} />
    )
}