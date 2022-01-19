import Head from "next/head";
import styled from "styled-components";
import ChatScreeen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { db, auth, addDoc, query, where, collection, doc, orderBy, getDocs } from "../../firebase";

function Chat({ id }) {
  return (
    <Container>
      <Head>
        <title>{id}</title>

      </Head>
      <Sidebar />
      <ChatContainer >
        <ChatScreeen />
      </ChatContainer>

    </Container>

  )
}

export default Chat


export async function getServerSideProps(context) {
  const chatsRef = doc(db, 'chats', context.query.id);
  const messagesRef = collection(chatsRef, 'messages');
  const messagesResQuery = query(messagesRef, orderBy('timestamp', 'asc'));
  const querySnapshot = await getDocs(messagesResQuery);
  const messages = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })).map(messages => ({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime()
  }));


  return {
    props: { messages : messages},
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