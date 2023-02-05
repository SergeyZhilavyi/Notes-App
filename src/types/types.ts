export type NewNoteProps = {
  onSubmit: (data: NoteData) => void 
  onAddTag: (data: Tags) => void
  availableTags: Tags[]
}

export type Note = {
    id: string
  } & NoteData
  
export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (data: Tags) => void
  availableTags: Tags[]
} & Partial<NoteData> // В данном случае сделали свойства  NoteData необязательными. Это позволит использовать NoteFormProps, как при создании, так и при редактировании заметок

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tags[]
}

export type Tags = {
  id: string,
  label: string
}

export type SimplifiedNote = {
  tags: Tags[]
  title: string
  id: string
}

export type NoteListProps = {
  availableTags: Tags[]
  notes: SimplifiedNote[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void 
  onAddTag: (data: Tags) => void
  availableTags: Tags[]
}

export type NoteShowProps = {
  onDelete: (id: string) => void
}

export type EditTagsModalProps = {
  show: boolean
  availableTags: Tags[]
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export type NoteLayoutProps = {
  notes: Note[]
}
