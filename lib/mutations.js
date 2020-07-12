'use strict';

const connectDB = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

const createCourse = async (root, { input }) => {
  const defaults = {
    teacher: '',
    topic: '',
  };
  const newCourse = Object.assign(defaults, input);
  let db;
  let course;
  try {
    db = await connectDB();
    course = await db.collection('courses').insertOne(newCourse);
    newCourse._id = course.insertedId;
  } catch (error) {
    errorHandler(error);
  }
  return newCourse;
};

const editCourse = async (root, { _id, input }) => {
  let db;
  let course;
  try {
    db = await connectDB();
    await db
      .collection('courses')
      .updateOne({ _id: ObjectID(_id) }, { $set: input });
    course = await db.collection('courses').findOne({ _id: ObjectID(_id) });
  } catch (error) {
    errorHandler(error);
  }
  return course;
};

const deleteCourse = async (root, { _id }) => {
  let db, info;
  try {
    db = await connectDB();
    info = await db.collection('courses').deleteOne({ _id: ObjectID(_id) });
    return info.deletedCount
      ? `Curso con id ${_id} fue eliminado`
      : 'ID no encontrado';
  } catch (error) {
    errorHandler(error);
  }
};

const createStudent = async (root, { input: newStudent }) => {
  let db;
  let student;
  try {
    db = await connectDB();
    student = await db.collection('students').insertOne(newStudent);
    newStudent._id = student.insertedId;
  } catch (error) {
    errorHandler(error);
  }
  return newStudent;
};

const editStudent = async (root, { _id, input }) => {
  let db;
  let student;
  try {
    db = await connectDB();
    await db
      .collection('students')
      .updateOne({ _id: ObjectID(_id) }, { $set: input });
    student = await db.collection('students').findOne({ _id: ObjectID(_id) });
  } catch (error) {
    errorHandler(error);
  }
  return student;
};

const deleteStudent = async (root, { _id }) => {
  let db, info;
  try {
    db = await connectDB();
    info = await db.collection('students').deleteOne({ _id: ObjectID(_id) });
    return info.deletedCount
      ? `Estudiante con id ${_id} fue eliminado`
      : 'ID no encontrado';
  } catch (error) {
    errorHandler(error);
  }
};

const addPeople = async (root, { courseID, personID }) => {
  let db, person, course;
  try {
    db = await connectDB();
    course = await db
      .collection('courses')
      .findOne({ _id: ObjectID(courseID) });
    person = await db
      .collection('students')
      .findOne({ _id: ObjectID(personID) });

    if (!course || !person) throw new Error('La persona o el curso no existe');

    await db
      .collection('courses')
      .updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: personID } },
      );
  } catch (error) {
    errorHandler(error);
  }
  return course;
};

module.exports = {
  createCourse,
  editCourse,
  createStudent,
  editStudent,
  deleteCourse,
  deleteStudent,
  addPeople,
};
