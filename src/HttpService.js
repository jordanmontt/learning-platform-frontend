import LessonInterceptor from './Interceptors/LessonInterceptor';
import ChapterInterceptor from './Interceptors/ChapterInterceptor';
import CourseInProgressInterceptor from './Interceptors/CourseInProgressInterceptor'
import FinishedLessonInterceptor from './Interceptors/FinishedLessonInterceptor';
import CourseInterceptor from './Interceptors/CourseInterceptor';

const axios = require('axios');

export default class HttpService {

    static async fetchFinishedLessons(courseInProgressId) {
        var finishedLessons = [];
        await axios.get('https://localhost:5001/api/finishedlesson/course-in-progress/' + courseInProgressId)
            .then(function (response) {
                if (response.data)
                    finishedLessons = FinishedLessonInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching finished lessons: ", error);
            })
        return finishedLessons;
    }

    static async fetchLessons(chapters) {
        var lessons = [];
        var chaptersIds = this.obtainChaptersIDs(chapters);
        await axios.post('https://localhost:5001/api/lesson/chapter', chaptersIds)
            .then(function (response) {
                if (response.data)
                    lessons = LessonInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching lessons: ", error);
            })
        return lessons;
    }

    static async fetchChapters(courseId) {
        var chapters = [];
        await axios.get('https://localhost:5001/api/chapter/course/' + courseId)
            .then(function (response) {
                if (response.data)
                    chapters = ChapterInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching chapters: ", error);
            })
        return chapters;
    }

    static async fetchCoursesInProgress(userId) {
        let coursesInProgress = [];
        await axios.get('https://localhost:5001/api/courseinprogress/all-courses/' + userId)
            .then(function (response) {
                if (response.data) {
                    coursesInProgress = CourseInProgressInterceptor.parseMany(response.data);
                }
            })
            .catch(function (error) {
                console.log("ERROR in fetching courses in progress: ", error);
            })
        return coursesInProgress;
    }

    static async fetchCourse(courseId) {
        let course = {};
        await axios.get('https://localhost:5001/api/course/' + courseId)
            .then(function (response) {
                if (response.data)
                    course = CourseInterceptor.parseOne(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in course name: ", error);
            })
        return course;
    }

    static obtainChaptersIDs(chapters) {
        let chaptersIds = [];
        chapters.forEach(c => chaptersIds.push(c.idChapter))
        return chaptersIds;
    }

}