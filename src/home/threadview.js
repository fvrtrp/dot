import React, { useEffect, useRef, useState, useMemo } from 'react'
import Linkify from 'react-linkify/dist/components/Linkify'
import { users } from '../users'

const initialAppState = {
    isAuthenticated: false,
    userDetails: null,
}

export default function View(props) {
    const [loading, setLoading] = useState(true)
    const { data } = props

    useEffect(() => {
        //scroll to bottom of list
        const el = document.querySelector('.threadView')
        if(el)  el.scrollTo(0, el.scrollHeight)
    }, [data])

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
                                <MemoViewItem key={i.id} data={i} />
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
                        <div className="postedBy">{targetUser.nickname.slice(0,2)}</div>
            <div className="value">
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a target="_blank" rel="noreferrer" href={decoratedHref} key={key}>
                        {decoratedText}
                    </a>
                )}>{data.value}</Linkify>
            </div>
        </div>
    )
}
const MemoViewItem = React.memo(ViewItem)