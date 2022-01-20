
import { Rings } from 'react-loader-spinner';
import Image from 'next/image';
import whatsappPic from '../public/whatsapp.png';


function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Image
            src={ whatsappPic}
            alt="place"
            height={200}
            width={200}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Rings
            heigth="100"
            width="100"
          />
        </div>
      </div>
    </center>
  )
}

export default Loading

