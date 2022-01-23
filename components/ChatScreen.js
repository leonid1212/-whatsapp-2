
import styled from "styled-components";
import { auth, serverTimestamp, useMessages, setUser, getRecipients } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useState ,useRef } from "react";
import TimeAgo from "timeago-react";


function ChatScreeen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const endOfMessagesRef = useRef();
  const [input, setInput] = useState("");
  const { messagesResQuery, addMessage } = useMessages(router.query.id);
  const [messagesSnapshot] = useCollection(messagesResQuery);
  const [recipientSnaphot] = useCollection(getRecipients(chat.users, user));

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
    scrollToBottom();
  }


  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior : "smooth",
      block : "start",
    });
  }

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    } else {
      const mes = JSON.parse(messages);
      if (mes && mes.length) {
        return mes.map(message => (
          <Message key={message.id} user={message.user} message={message} />
        ))
      }
    }
  }

  const recipient = recipientSnaphot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {
          recipient ? (
            <Avatar src={recipient?.photoURL} />
          ) : (
            <Avatar >{recipientEmail[0]}</Avatar>
          )
        }
        <HeaderInformation >
          <h3>{recipientEmail}</h3>
          {recipientSnaphot ? (
            <p>Last active : {' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}

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
        <EndOfMessage ref={endOfMessagesRef} />
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
    margin-top: 0; 
    font-size: 14px;
     color : gray;
   }
`;


const HeaderIcons = styled.div`
`;

const EndOfMessage = styled.div`
 margin-bottom: 50px;

`;

const MessageContainer = styled.div`
 padding : 30px;
 background-color :#e5ded8;
 min-height : 90vh;
`;


