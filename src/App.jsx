import { useEffect, useRef, useState } from 'react'
import './App.css'
import { data } from './components/data'
import AOS from 'aos';

function App() {

  const [box, setBox] = useState([])
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const loadmoreButton = () => {
    setBox(prev => [...prev, ...data.slice(prev.length, prev.length + 3)]);
  };
  const minurmorButton = () => {
    setBox(prev => prev.slice(0, prev.length - 3));
  };

  const handleSort = ()=>{
    // dublicate item 
    let _boxItems = [...box]
    // remove and save the draggged content 
    const dragItemContent = _boxItems.splice(dragItem.current , 1)[0]
    // switch the position 
    _boxItems.splice(dragOverItem.current,0,dragItemContent)
    // reset position 
    dragItem.current = null
    dragOverItem.current = null


    // update actuall array 
    setBox(_boxItems)

  }

  useEffect(() => {
    setBox(data.slice(0, 3));
    console.log(box)
    AOS.init({});
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
        {
          box.map((item, index) => (
            <div data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="300" key={index} style={{ width: "32%", border: "1px solid", height: "100px", display: "flex", justifyContent: 'center', alignItems: "center"  , backgroundColor:"lightblue" , cursor:"move" , boxShadow:"0 0 10px 2px #000"}} draggable
              onDragStart={(e) => dragItem.current=index}
              onDragEnter={(e) => dragOverItem.current=index}
              onDragEnd={handleSort}
              onDragOver={(e)=>e.preventDefault()}
            >
              <h1>{item.name}</h1>
            </div>
          ))
        }
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", textAlign: "center", marginTop: "20px" }}>
          {box.length < data.length ? <button onClick={loadmoreButton}>Load More</button> : null}
          {box.length > 3 ? <button onClick={minurmorButton}>Minus More</button> : null}
        </div>
      </div>

    </>
  )
}

export default App
