import React, { useEffect, useRef, useState, useMemo } from 'react'
import { users } from '../users'

const initialAppState = {
    isAuthenticated: false,
    userDetails: null,
}

export default function View(props) {
    const [loading, setLoading] = useState(true)
    const { data } = props

    useEffect(() => {
    }, [])

    console.log(`data`, data)

    return (
        <div className="threadView">
            {
                !data ? 
                <div className="noData">No data</div>
                :
                <div className="viewContainer">
                    {
                        data.map(i => {
                            return (
                                <ViewItem key={i.id} data={i} />
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

function ViewItem(props) {
    const { data } = props
    const targetUser = users.find(i => i.id===data?.postedBy)
    return (
        <div className="viewItem">
            <div className="value">{data.value}</div>
            <div className="postedBy">posted by {targetUser.nickname}</div>
        </div>
    )
}