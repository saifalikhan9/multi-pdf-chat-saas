import { auth } from '@/services/auth/auth'
import SmartGreeting from './Greet'

export default async function DashboardPage() {
    const session = await auth()
    const userName = session?.user.name;
    return (<>
        <div className='space-y-8'>
            <h1>Hi {session?.user.name}</h1>
            <SmartGreeting userName={userName!} />
        </div></>)
}
