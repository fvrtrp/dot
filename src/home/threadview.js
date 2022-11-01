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
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

    return (
        <div className="viewItem">
                        <div className="postedBy">{targetUser.nickname.slice(0,2)}</div>
            <div className="value">
                {
                    isValidUrl(data.value) &&
                    <a href={data.value} target="_blank" rel="noreferrer">{data.value.slice(0,50)+'...'}</a>
                }
                {
                    !isValidUrl(data.value) && data.value
                }
            </div>
        </div>
    )
}
const MemoViewItem = React.memo(ViewItem)