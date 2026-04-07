import { Note } from "../models/note.js";
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
    try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const pageNumber = Number(page);
    const perPageNumber = Number(perPage);

    const skip = (pageNumber - 1) * perPageNumber;

    const filter = { userId: req.user._id };

    if (tag) filter.tag = tag;
    if (search) filter.$text = { $search: search };

    const notesQuery = Note.find(filter);

    const [totalNotes, notes] = await Promise.all([
        Note.countDocuments(filter),
        notesQuery.skip(skip).limit(perPage),
    ]);

    const totalPages= Math.ceil(totalNotes / perPageNumber) || 1;

    res.status(200).json({
        page: Number(page),
        perPage: Number(perPage),
        totalNotes,
        totalPages,
        notes,
        }); 
    } catch (error) {
        next(error);
    }
};

export const getNoteById = async (req, res) => {
    const {noteId} = req.params;
    const note = await Note.findOne({ _id: noteId, userId: req.user._id });

    if(!note) {
        throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
};

export const createNote = async (req, res) => {
    console.log('User object:', req.user);
    const note = await Note.create({
        ...req.body,
        userId: req.user._id
    });
    res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
    const {noteId} = req.params;
    const note = await Note.findOneAndDelete({ _id: noteId, userId: req.user._id });
    if(!note) {
        throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
};


export const updateNote = async (req, res) => {
    const {noteId} = req.params;
    const note = await Note.findOneAndUpdate(
            { _id: noteId, userId: req.user._id },
            req.body,
            { returnDocument: 'after' },
        );

    if(!note) {
        throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
};