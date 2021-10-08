import '../styles/AuthForm.scss';
import { useState } from 'react'

import supabase from '../lib/supabase'

const AuthForm = () => {
    const [email, setEmail] = useState();
    const [mailSent, setMailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = await supabase.auth.signIn({ email })

        setMailSent(true);

        console.log({ error })
    }

    return (
        <div className={"auth-form"}>
            <h1>trackrrr</h1>
            <h2 className={"mb-m"}>Yet another time tracking tool</h2>

            {!mailSent && 
            (<>
                <p>
                    Fill in your email, we'll send you a magic link.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        onChange={e => setEmail(e.target.value)}
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

            {mailSent && 
            (
                <p>
                    Mail has been sent.<br/>Please check your mails and follow the link.
                </p>   
            )}
        </div>
    )
}

export default AuthForm;
