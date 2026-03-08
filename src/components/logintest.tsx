"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginTest() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (session !==null) {
        return (
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>Welcome, {session?.user?.name}!</h2>
                <p>Email: {session?.user?.email}</p>
                <img src={session?.user?.image || ""} alt="Profile" width={50} style={{ borderRadius: '50%' }} />
                <br /><br />
                <button onClick={() => signOut()} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Sign Out
                </button>
            </div>
        )
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>You are not logged in</h2>
            <button onClick={() => signIn('google')} style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}>
                Sign in with Google
            </button>
            <button onClick={() => signIn('github')} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                Sign in with GitHub
            </button>
        </div>
    )
}