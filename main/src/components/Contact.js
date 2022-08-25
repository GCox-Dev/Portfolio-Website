import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {

    let formRef = useRef();

    console.log(process.env.EMAIL_USER_ID);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            "service_kk0vgct",
            "template_0e1xno6",
            formRef.current,
            "mF43UlI5GOR0Hy6Et"
        ).then(
            result => alert("email sent"),
            error => console.log(error)
        );

        e.target.reset();
    }

    return (
        <form ref={formRef} onSubmit={sendEmail} className="contact">
            <input type="text" name="user_name" placeholder='Name...'/>
            <input type="email" name="user_email" placeholder='Email...' required/>
            <textarea name="message" placeholder='Message...' required/>
            <input type="submit" value="Send" />
        </form>
    );
}