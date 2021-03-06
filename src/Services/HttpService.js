import LessonInterceptor from '../Interceptors/LessonInterceptor';
import ChapterInterceptor from '../Interceptors/ChapterInterceptor';
import CourseInProgressInterceptor from '../Interceptors/CourseInProgressInterceptor'
import FinishedLessonInterceptor from '../Interceptors/FinishedLessonInterceptor';
import CourseInterceptor from '../Interceptors/CourseInterceptor';
import VideoInterceptor from '../Interceptors/VideoInterceptor';
import CategoryInterceptor from '../Interceptors/CategoryInterceptor';
import PersonInterceptor from '../Interceptors/PersonInterceptor';

const axios = require('axios');
const requestDomain = 'https://localhost:5001/api/';

export default class HttpService {

    static async fetchFinishedLessonsFromCourseInProgress(courseInProgressId) {
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

    static async postFinishedLesson(finishedLesson) {
        let wasSuccessful = false;
        await axios.post(requestDomain + 'finishedlesson', finishedLesson)
            .then(function (response) {
                if (response.status)
                    wasSuccessful = true;
            })
            .catch(function (error) {
                console.log("ERROR posting finishedLesson: ", error);
            })
        return wasSuccessful;
    }

    static async fetchLessonsFromChapters(chapters) {
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

    static async fetchVideos(lessons) {
        var videos;
        var videosIds = this.obtainVideoIdsFromLessons(lessons);
        await axios.post(requestDomain + 'video/many', videosIds)
            .then(function (response) {
                videos = VideoInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching videos: ", error);
            })
        return videos;
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

    static async fetchCoursesInProgressFromUser(userId) {
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

    static async fetchCourseInProgress(courseInProgressId) {
        let courseInProgress = {};
        await axios.get(requestDomain + 'courseinprogress/' + courseInProgressId)
            .then(function (response) {
                if (response.data) {
                    courseInProgress = CourseInProgressInterceptor.parseOne(response.data);
                }
            })
            .catch(function (error) {
                console.log("ERROR in fetching courses in progress: ", error);
            })
        return courseInProgress;
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

    static async fetchCategory(idCategory) {
        var category;
        await axios.get(requestDomain + 'category/' + idCategory)
            .then(function (response) {
                category = CategoryInterceptor.parseOne(response.data);
            })
            .catch(function (error) {
                console.log("ERROR in fetching category: ", error);
            })
        return category;
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

    static async enrollToACourse(studentId, courseId) {
        var cp;
        await axios.get(requestDomain + `courseinprogress/enroll/${studentId}/${courseId}`)
            .then(function (response) {
                cp = CourseInProgressInterceptor.parseOne(response.data);
            })
            .catch(function (error) {
                console.log("ERROR enrolling student: ", error);
            });
        return cp;
    }

    static async searchCourse(query) {
        let courses = [];
        await axios.get(requestDomain + `course/search-by-name/${query}`)
            .then(function (response) {
                courses = CourseInterceptor.parseMany(response.data);
            })
            .catch(function (error) {
                console.log("ERROR searching a course: ", error);
            });
        return courses;
    }

    static obtainChaptersIDs(chapters) {
        let chaptersIds = [];
        chapters.forEach(c => chaptersIds.push(c.idChapter))
        return chaptersIds;
    }

    static obtainVideoIdsFromLessons(lessons) {
        let videosIds = [];
        lessons.forEach(l => videosIds.push(l.idVideo))
        return videosIds;
    }


}