import React, { useEffect, useRef, useState } from 'react'
import { get_docs, add_doc, listener, update_doc } from '../firebase'
import Form from '../form'
import { users } from '../users'
import { sha256 } from 'js-sha256'
import ThreadView from './threadview'
import DotLogo from '../dot.png'

const initialAppState = {
    isAuthenticated: false,
    userDetails: null,
}

export default function Home(props) {
    const passwordRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const [appState, setAppState] = useState(initialAppState)
    const [appData, setAppData] = useState([])
    const [appConfig, setAppConfig] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        listener(updateLocalData)
        setLoading(false)
        return (() => {
            console.log(`removing listener`)
            listener('stop')
        })
    }, [])

    const addItem = (data) => {
        //processing
        data = {
            ...data,
            id: appData.length===0?1:appData[appData.length-1].id+1,
            postedBy: appState.userDetails.id,
            timeStamp: new Date().toUTCString()
        }
        update_doc({
            appData: [...appData, data],
            appConfig
        })
    }

    const updateLocalData = (data) => {
        if(Object.keys(data).length === 0) {
            data = { appData: [], appConfig: {} }
        }
        console.log(`zzzwillupdate`, data)
        setAppData(data['appData'])
        setAppConfig(data['appConfig'])
    }



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

    if(loading) return <div className="loading">loading</div>

    return (
        <div className="home">
            {/* {
                appState.isAuthenticated && 
                <div className="userSection">{appState.userDetails.nickname}</div>
            } */}
            <div className="appHeader">
                <a href="https://surajk95.github.io"><img className="appTitle" alt="app logo" title="DOT by fevertrip" src={DotLogo} /></a>
            </div>
            <ThreadView data={appData} />
            {
                !appState.isAuthenticated ?
                <div className="formContainer">
                    <form onSubmit={authenticateWithPassword}>
                        <input
                            type="password"
                            placeholder="enter your passcode to start posting"
                            defaultValue=""
                            ref={passwordRef}
                        />
                        <div onClick={authenticateWithPassword} className="submitForm">Go</div>
                    </form>
                </div>
                :
                <Form finish={addItem} />
            }
        </div>
    )
}