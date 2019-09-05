import LessonInterceptor from './Interceptors/LessonInterceptor';
import ChapterInterceptor from './Interceptors/ChapterInterceptor';
import CourseInProgressInterceptor from './Interceptors/CourseInProgressInterceptor'
import FinishedLessonInterceptor from './Interceptors/FinishedLessonInterceptor';
import CourseInterceptor from './Interceptors/CourseInterceptor';
import VideoInterceptor from './Interceptors/VideoInterceptor';
import CategoryInterceptor from './Interceptors/CategoryInterceptor';
import PersonInterceptor from './Interceptors/PersonInterceptor';

const axios = require('axios');
const requestDomain = 'https://localhost:5001/api/';

export default class HttpService {

    static async fetchFinishedLessons(courseInProgressId) {
        var finishedLessons = [];
        await axios.get(requestDomain + 'finishedlesson/course-in-progress/' + courseInProgressId)
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
        await axios.post(requestDomain + 'lesson/chapter', chaptersIds)
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
        await axios.get(requestDomain + 'chapter/course/' + courseId)
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
        await axios.get(requestDomain + 'courseinprogress/all-courses/' + userId)
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
        await axios.get(requestDomain + 'course/' + courseId)
            .then(function (response) {
                if (response.data)
                    course = CourseInterceptor.parseOne(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in course name: ", error);
            })
        return course;
    }

    static async fetchVideos() {
        var videos;
        await axios.get(requestDomain + 'video')
            .then(function (response) {
                videos = VideoInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching videos: ", error);
            })
        return videos;
    }

    static obtainChaptersIDs(chapters) {
        let chaptersIds = [];
        chapters.forEach(c => chaptersIds.push(c.idChapter))
        return chaptersIds;
    }

    static async fetchCategories() {
        var categories;
        await axios.get(requestDomain + 'category')
            .then(function (response) {
                categories = CategoryInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching categories: ", error);
            })
        return categories;
    }

    static async fetchCoursesFromCategory(categoryId) {
        var coursesFromCategory;
        await axios.get(requestDomain + 'course/category/' + categoryId)
            .then(function (response) {
                coursesFromCategory = CourseInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching coursesFromCategory: ", error);
            })
        return coursesFromCategory;
    }

    static async fetchPersonById(personId) {
        var person;
        await axios.get(requestDomain + 'person/id/' + personId)
            .then(function (response) {
                person = PersonInterceptor.parseOne(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching person: ", error);
            });
        return person;
    }

}