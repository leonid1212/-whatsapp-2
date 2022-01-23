import { useRouter} from 'next/router';
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, getUserChatQuery } from "../firebase";

function Chat({ id, users }) {

  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnaphots] = useCollection(getUserChatQuery(user));
  const recipient = recipientSnaphots?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  return (
    <Container onClick={enterChat}>
      { (recipient) ? (<UserAvatar src={recipient?.photoURL} />
      ) : (<UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display : flex;
  align-items: center;
  cursor: pointer;
  padding : 15px;
  word-break: break-word;

  :hover {
   background-color: #e9eaeb;
 }

`;
const UserAvatar = styled(Avatar)`
  margin : 5px;
  margin-right : 15px;
`;