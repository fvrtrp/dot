import React, { useState, useEffect } from 'react'
import './index.scss'

const initialFormData = {
    value: '',
    id: null,
    tags: [],
    postedBy: null,
    timeStamp: null,
}

export default function Form(props) {
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(null)
    useEffect(() => {
        console.log(`form init`)
    }, [])

    const updateForm = (type, e) => {
        let value = null
        switch(type) {
            case 'value': {
                value = e.target.value
                break
            }
            default: break
        }
        setFormData({...formData, [type]: value})
    }

    const submitForm = (e) => {
        e.preventDefault()
        //Validation
        if(formData.value.trim()==='') {
            //throw alert here
            setError('Empty message')
            return
        }
        setError(null)
        console.log(`submitting form`, formData)
        props.finish(formData)
    }

    return (
        <div className="formContainer">
            <form onSubmit={submitForm}>
                <input
                    type="text"
                    placeholder="say something"
                    defaultValue=""
                    onChange={(e)=>updateForm('value', e)}
                />
            </form>
            <div className="home" onClick={submitForm}>Add</div>
            {
            error && <div className="validationError">{error}</div>
            }
        </div>
    )
}