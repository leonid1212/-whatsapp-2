
import { Rings } from 'react-loader-spinner';
import Image from 'next/image';


function Loading() {
 


  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <Image
          src={"/whatsapp.png"}
          alt="place"
          style={{ marginBottom: 10 }}
          height={200}
          width={200}
          
        
        />
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

