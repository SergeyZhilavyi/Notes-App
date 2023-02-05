import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import { NewNote } from "./NewNote"
import { RawNote, NoteData, Tags } from "../types/types"
import { NoteList } from "./NoteList"
import { NoteLayout } from "./NoteLayout"
import { NoteShow } from "./NoteShow"
import { EditNote } from "./EditNote"


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", [])

  // Функция возвращает объект (на основании данных в RawNote) в котором добавляет новое поле tags
  // В  этом поле-массиве  содержатся данные из массива tags, но только те, которые совпают с содержащимся значениями в  tagIds
  // Т.е массива , содержащего id выбранных в заметке тегов.  
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  // Создание новой заметки
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  // Редактирование заметки
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          // Сначала получаем исходные данные, а затем заменяем их новыми данными
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  // Удаление заметки
  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  // Добавление нового тега
  function addTag(tag: Tags) {
    setTags(prev => [...prev, tag])
  }

  // Редактирование тега 
  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  // Удаление тега
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={
          <NoteList
            notes={notesWithTags}
            availableTags={tags}
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
          />

        }/>
        <Route
          path="/new"
          element={
            <NewNote 
              onSubmit={onCreateNote}
              onAddTag={addTag} 
              availableTags={tags}
            />
          } 
        />

        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index  element={<NoteShow onDelete={onDeleteNote}/>}/>
          <Route path="edit" element={
            <EditNote 
              onSubmit={onUpdateNote}
              onAddTag={addTag} 
              availableTags={tags}
            />
            }/>
        </Route>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </Container>
  )
}

export default App
