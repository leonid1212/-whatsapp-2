
import styled from "styled-components";
import { auth, serverTimestamp, useMessages, setUser } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useState } from "react";


function ChatScreeen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState("");
  const { messagesResQuery, addMessage } = useMessages(router.query.id);
  const [messagesSnapshots] = useCollection(messagesResQuery);

  const sendMessage = (e) => {
    e.preventDefault();
    const serverTime = serverTimestamp();
    setUser(user.uid, {
      lastSeen: serverTime,
    });

    addMessage({
      timestamp: serverTime,
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });


    setInput("");

  }


  const showMessages = () => {
    if (messagesSnapshots) {
      return messagesSnapshots.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    }
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation >
          <h3>Rec Email</h3>
          <p>Last seen...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer >
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage} >Send Message</button>
        <MicIcon />
      </InputContainer>
    </Container>

  )
}

export default ChatScreeen;




const Container = styled.div`

`;

const Input = styled.input`
  flex : 1;
  outline : 0;
  border : none;
  border-radius :10px;
  background-color :whitesmoke;
  padding : 20px;
  margin-left: 15px;
  margin-right : 15px;
`;


const Header = styled.div`
  position : sticky;
  display :flex;
  top : 0;
  background-color :white;
  z-index: 100;
  align-items: center;
  padding : 11px;
  height : 80px;
  border-bottom: 1px solid whitesmoke;
  flex-grow: 1;
`
const InputContainer = styled.form`
  display : flex;
  align-items : center;
  padding : 10px;
  position :sticky;
  bottom : 0;
  background-color :white;
  z-index: 100;
`;


const HeaderInformation = styled.div`
  margin-left: 15px;
  flex : 1;
   > h3 {
     margin-bottom: 3px;
   }

   > p {
     font-size: 14px;
     color : gray;
   }
`;


const HeaderIcons = styled.div`
`;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
 padding : 30px;
 background-color :#e5ded8;
 min-height : 90vh;
`;


