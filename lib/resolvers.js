'use strict';

const courses = [
  {
    _id: '1',
    title: 'titulo',
    teacher: 'prof',
    description: 'desc',
    topic: 'progr',
  },
  {
    _id: '2',
    title: 'titulo',
    teacher: 'prof',
    description: 'desc',
    topic: 'progr',
  },
  {
    _id: '3',
    title: 'titulo',
    teacher: 'prof',
    description: 'desc',
    topic: 'progr',
  },
];

module.exports = {
  Query: {
    getCourses: () => {
      return courses;
    },
    getCourse: (root, args) => {
      const course = courses.find((c) => c._id === args.id)
      return course;
    }
  }
};
