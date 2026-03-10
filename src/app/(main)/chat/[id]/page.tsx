import ChatUI from "@/components/chat/chat-ui"
import { getChats } from "@/lib/getChatsHistory"

export default async function ChatPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
  
    const { id } = await params
  
    const msg = await getChats(id)
  
    return <ChatUI initMessage={msg} docId={id} />
  }