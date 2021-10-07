import '../styles/AuthForm.scss';
import { useState } from 'react'

import supabase from '../lib/supabase'

const AuthForm = () => {
    const [email, setEmail] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = await supabase.auth.signIn({ email })

        console.log({ error })
    }

    return (
        <div className={"auth-form"}>
            <h1>trackrrr</h1>
            <h2>Yet another time tracking tool</h2>

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
                >
                    Let's go!
                </button>
            </form>
        </div>
    )
}

export default AuthForm;
