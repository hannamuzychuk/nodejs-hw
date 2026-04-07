import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";
import { getAllNotesSchema, noteIdSchema, createNoteSchema, updateNoteSchema } from "../validations/notesValidation.js";
import { celebrate } from "celebrate";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.use(authenticate);

router.get('/', celebrate(getAllNotesSchema), getAllNotes);
router.get('/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/', celebrate(createNoteSchema), createNote);
router.delete('/:noteId', celebrate(noteIdSchema), deleteNote);
router.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;