import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [notes ,setNotes] = useState([])
  const [selectedNotes,setSelectedNotes] = useState([]) //store the selected id
console.log("hello world") 
// IMPORTANT:
// Never call API directly inside component body.
// Because setState causes re-render → API runs again → infinite loop.
// Always use useEffect for side effects like API calls.

// 1. Problem: console.log aur API call infinite baar run ho rahe hain.

// 2. Problem: Component baar-baar re-render ho raha hai (infinite loop).

// 3. Reason: Axios API call component body ke andar likhi hui hai.

// 4. Reason: Component body ka code har render par dobara execute hota hai.

// 5. Reason: API response aane par setNotes() state update hota hai.

// 6. React Rule: State update → component re-render trigger karta hai.

// 7. Re-render hone par component function phir se run hota hai.

// 8. Phir axios call again hoti hai → phir setNotes → phir render.

// 9. Ye cycle infinite loop ban jati hai.

// 10. Isliye console.log bhi infinite print hota hai.

// 11. Root Cause: Side effects (API call) component function ke andar likhe gaye hain.

// 12. React principle: Component function should be pure (no side effects).

// 13. Solution: Side effects ko useEffect hook ke andar move karo.

// 14. useEffect with empty dependency array [] sirf first render ke baad ek baar run hota hai.

// 15. Final Fix: API call useEffect me likhne se infinite loop stop ho jata hai.



// setState in component body causes infinite re-render → use useEffect

// jab bhi aap state variable ko change karte ho to jiske andar ye state variable hota hai vo component vapis  render hota hai iska sol useeffect.

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then(res => {
        setNotes(res.data.notes)
    })
  }  
  useEffect(() => {
    fetchNotes()
  }, [])
   
  //use effect ko use karne se pehala ka scene
  // axios.get('http://localhost:3000/api/notes')
  //     .then(res => {
  //       setNotes(res.data.notes)
  //     })

  //parameter e stands for an event.
  function handleSubmit(e) {
    e.preventDefault()
    const{title,description}=e.target.elements
    console.log(title.value,description.value)
    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })


  }

  function handleDeleteNote(Noteid){
    axios.delete("http://localhost:3000/api/notes/"+Noteid)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleCheckboxChaneg(noteId){
    setSelectedNotes(prev=>{
      if(prev.includes(noteId)){
        return prev.filter(id=>id!== noteId) //remove
      }else{
        return [...prev,noteId]//add
      }
    })
  }

  function handleSelectAll(e){
    if(e.target.checked){
      const allIds = notes.map(note => note._id)
      setSelectedNotes(allIds)
    }else{
      setSelectedNotes([])
    }
  }

  function handleDeleteSelected() {

    if (selectedNotes.length === 0) {
      alert("No notes selected")
      return
    }

    const confirmDelete = window.confirm("Are you sure you want to delete selected notes?")

    if (!confirmDelete) return

    Promise.all(
      selectedNotes.map(id =>
        axios.delete("http://localhost:3000/api/notes/" + id)
      )
    ).then(() => {
      fetchNotes()
      setSelectedNotes([])
    })

  }

  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name = "title" type="text" placeholder='Enter Title' />
      <input name = "description" type="text" placeholder='Enter Description' />
      <button type='submit'>Create Note</button>
    </form>
    <label>
        <input
          type="checkbox"
          checked={selectedNotes.length === notes.length && notes.length > 0}
          onChange={handleSelectAll}
        />
        Select All
      </label>
    <button className='central-del' onClick={handleDeleteSelected}>
        DELETE SELECTED
      </button>
    <div className='notes'>
      {
        notes.map(note => {
           return <div className='note'> 
                  <h1>{note.title}</h1>
                  <p>{note.description}</p>
                  <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
                  <input type = "checkbox" checked={selectedNotes.includes(note._id)}
                  onChange={()=> handleCheckboxChaneg(note._id)}/>
      </div>
        })
      }
      
    </div>
    </>
  )
}

export default App
