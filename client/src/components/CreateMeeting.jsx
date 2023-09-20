import React from 'react'

const CreateMeeting = () => {

    function create(){
        const id = Date.now()
        props.history.push(`/meeting/${id}`)
    }
  return (
    <button onClick={create}> Create Room</button>
  )
}

export default CreateMeeting