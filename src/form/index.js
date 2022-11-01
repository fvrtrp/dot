import React, { useState, useEffect, useRef } from 'react'
import './index.scss'

const initialFormData = {
    value: '',
    id: null,
    tags: [],
    postedBy: null,
    timeStamp: null,
}

function Form(props) {
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(null)
    const inputRef = useRef(null)
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
        inputRef.current.value = ''
        props.finish(formData)
        setFormData(initialFormData)
    }

    return (
        <div className="formContainer">
            <form onSubmit={submitForm}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type, or paste links"
                    defaultValue=""
                    onChange={(e)=>updateForm('value', e)}
                    autoFocus
                />
            </form>
            <div className="submitForm" onClick={submitForm}>Go</div>
            {
            error && <div className="validationError">{error}</div>
            }
        </div>
    )
}

export default React.memo(Form)