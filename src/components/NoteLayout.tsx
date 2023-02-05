import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note, NoteLayoutProps } from "../types/types"


export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams()
  const note = notes.find(n => n.id === id)

  if (note == null) return <Navigate to="/" replace />

  // Пробрасываем это значение во вложенные маршруты
  return <Outlet context={note} />
}

// Функция доступна для вложенных маршрутов
export function useNote() {
  return useOutletContext<Note>()
}