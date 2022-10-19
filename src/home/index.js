import React, { useEffect, useRef, useState } from 'react'
import { get_docs, add_doc } from '../firebase'
import Form from '../form'
import { users } from '../users'
import { sha256 } from 'js-sha256'

const initialAppState = {
    isAuthenticated: false,
    userDetails: null,
}

export default function Home(props) {
    const passwordRef = useRef(null)
    const [appState, setAppState] = useState(initialAppState)
    const [error, setError] = useState(null)
    useEffect(() => {
        console.log(`getting`)
        get_docs()
    }, [])

    const authenticateWithPassword = (e) => {
        e.preventDefault()
        const val = passwordRef.current.value
        const target = users.find(i => i.hash === sha256(val))
        console.log(`authenticating with`, val, target)
        if(!target) {
            setError('wrong password.')
        }
        else {
            setAppState({...appState, isAuthenticated: true, userDetails: target})
            setError(null)
        }
        passwordRef.current.value = ''
    }

    return (
        <div className="home">
            {
                appState.isAuthenticated && 
                <div className="userSection">{appState.userDetails.nickname}</div>
            }
            <Form />
            {
                !appState.isAuthenticated &&
                <form onSubmit={authenticateWithPassword}>
                    <input
                        type="password"
                        placeholder="enter your passcode to start posting"
                        defaultValue=""
                        ref={passwordRef}
                    />
                    <div onClick={authenticateWithPassword}>Authenticate</div>
                </form>
            }
        </div>
    )
}