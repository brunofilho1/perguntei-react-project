import {ButtonHTMLAttributes} from 'react'; // tipagem que declara todos atributos que o botão pode receber

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean;
}; 
                                    // rest operator
export function Button({isOutlined = false, ...props}: ButtonProps) {
    return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`} 
        {...props} 
        />
    )
}