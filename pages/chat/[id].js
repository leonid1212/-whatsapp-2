import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreeen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { db, auth, addDoc, query, where, collection, doc, orderBy, getDocs, getDoc, useMessages } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({messages,chat}) {

  const [user] = useAuthState(auth); 
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users,user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer >
        <ChatScreeen  chat={chat} messages={messages}/>
      </ChatContainer>
    </Container>

  )
}

export default Chat


export async function getServerSideProps(context) {
  const { messagesResQuery , chatsRef, messages }  =  useMessages(context.query.id);

  const docSnap = await getDoc(chatsRef);
  const chat = {
    id: docSnap.id,
    ...docSnap.data(),
  }

  const fbMessages = await messages();
  return {
    props: {
      messages: JSON.stringify(fbMessages),
      chat: chat,
    }
  }
}

const Container = styled.div`
   display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height : 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style : none; /* IE and Edge*/
  scrollbar-width : none; /* Firefox */
`;