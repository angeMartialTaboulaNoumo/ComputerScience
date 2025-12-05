import '../assets/styles/button.css'
export default function Button({variantType, icon, text, ...props}){
    return (
        <button className={`variant ${variantType}`} {...props}>
            <i className={icon}></i> {text}
        </button>
    );
}