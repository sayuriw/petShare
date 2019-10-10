import React from 'react'


export default function EditCard({pet, onSubmit}) {

  return (
    <section>
      <form /*onSubmit={handleSubmit}*/>
        <input name="title"
               value={pet.title}/>
        <input name="description"
               type="description"
              //  onChange={updateFormData}
               value={pet.description}/>
        <input name="email" 
               type="email"
              //  onChange={updateFormData}
               value={pet.email}/>
        <input name="picture"
               type="file"
              //  onChange={updateFormData}
              value={pet.picture}/>
      </form>
    </section>
  )
} 