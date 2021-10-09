import '../styles/AuthForm.scss';
import { useState } from 'react'

import supabase from '../lib/supabase'

const AuthForm = () => {
    const [email, setEmail] = useState();
    const [mailState, setMailState] = useState('default');

    const handleSubmit = async (e) => {
        e.preventDefault()

        setMailState('loading');

        const { error } = await supabase.auth.signIn({ email })

        setMailState('sent');
    }

    return (
        <div className={"auth-form"}>
            <h1>trackrrr</h1>
            <h2 className={"mb-m"}>Yet another time tracking tool</h2>

            {mailState === "default" && 
            (<>
                <p>
                    Fill in your email, we'll send you a magic link.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className={"turquoise-flow"}
                    >
                        Let's go!
                    </button>
                </form>
            </>
            )}

            
            {mailState === "loading" &&
            //todo: add loading animation
            (
                <p>
                    loading...
                </p>
            )}

{mailState === "error" &&
            (
                <p>
                    Something went wrong. Please try again later.
                </p>
            )}


            {mailState === "sent" && 
            (
                <p>
                    Mail has been sent.<br/>Please check your mails and follow the link.
                </p>   
            )}
        </div>
    )
}

export default AuthForm;
