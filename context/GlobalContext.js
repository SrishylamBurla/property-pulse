'use client'
import { getUnreadMessagesCount } from "@/app/actions/getUnreadMessagesCount";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext()

export function GlobalProvider({children}){
    const {data: session} = useSession()
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(()=>{
        if(session && session.user){
        getUnreadMessagesCount().then((res)=>{
            if(res.count) setUnreadCount(res.count)
        })
    }
    },[getUnreadMessagesCount, session])

    return <GlobalContext.Provider value={{
        unreadCount,
        setUnreadCount
    }}>
        {children}
    </GlobalContext.Provider>
}

export function useGlobalContext(){
    return useContext(GlobalContext)
}