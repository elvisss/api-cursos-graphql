'use strict';

const connectDB = require('./db');
const { ObjectID } = require('mongodb');
const errorHandler = require('./errorHandler');

const Course = {
  people: async ({ people }) => {
    let db, peopleData, ids;
    try {
      db = await connectDB();
      ids = people ? people.map((id) => ObjectID(id)) : [];
      peopleData = ids.length
        ? await db
            .collection('students')
            .find({ _id: { $in: ids } })
            .toArray()
        : [];
    } catch (error) {
      errorHandler(error);
    }
    return peopleData;
  },
};

const Person = {
  __resolveType: (person, context, info) => {
    if (person.phone) {
      return 'Monitor';
    }
    return 'Student';
  },
};

const GlobalSearch = {
  __resolveType: (item, context, info) => {
    if (item.title) {
      return 'Course'
    }
    if (item.phone) {
      return 'Monitor'
    }
    return 'Student'
  }
}

module.exports = {
  Course,
  Person,
  GlobalSearch,
};
