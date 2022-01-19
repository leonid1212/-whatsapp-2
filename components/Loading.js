
import { Rings } from 'react-loader-spinner';
function Loading() {
  return (
    <center style={{ display : "grid", placeItems : "center", height: "100vh" }}>
      <div>
        <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="place"
          style={{ marginBottom: 10 }}
          height={200}
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

