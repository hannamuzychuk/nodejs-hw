import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";
import { getAllNotesSchema, noteIdSchema } from "../validations/notesValidation.js";
import { celebrate } from "celebrate";

const router = Router();

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', deleteNote);
router.patch('/notes/:noteId', updateNote);

export default router;