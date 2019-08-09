import React from 'react'
import VideoPlayer from './VideoPlayer'
import CourseContent from './CourseContent'
import VideoHeaders from './VideoHeaders'
import LessonInterceptor from './Interceptors/LessonInterceptor';
import ChapterInterceptor from './Interceptors/ChapterInterceptor';
import VideoInterceptor from './Interceptors/VideoInterceptor';
import FinishedLessonInterceptor from './Interceptors/FinishedLessonInterceptor';
import ProgressBar from './ProgressBar';

const axios = require('axios');

export default class ViewVideo extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeLesson = this.handleChangeLesson.bind(this);
        this.dataFromParentComponent = {
            idCourseInProgress: 2,
            idLessonInProgress: 4,
            idCourse: 1,
            idStudent: 1,
            lastAccessDate: "2019-07-10 10:34:09"
        };
        this.state = {
            chapters: [],
            lessons: [],
            finishedLessons: [],
            videos: [],
            currentChapter: {},
            currentLesson: {},
            videoSrc: ""
        }
    }

    componentDidMount() {
        this.obtainData();
    }

    obtainData() {
        this.fetchData()
            .then(response => {
                this.dataObtainedSuccessfully(response);
            })
            .catch(error => {
                console.log("ERROR in fetching data: ", error)
            });
    }

    dataObtainedSuccessfully(data) {
        let videos = data.videos;
        let lessons = data.lessons;
        let chapters = data.chapters;
        let currentLesson = this.obtainLessonFromId(lessons);
        let currentChapter = this.obtainChapterFromLesson(chapters, currentLesson);
        let finishedLessons = data.finishedLessons;
        let videoSrc = this.findVideoSrc(videos, currentLesson.idVideo);
        this.setState({
            videoSrc: videoSrc,
            currentChapter: currentChapter,
            currentLesson: currentLesson,
            videos: videos,
            lessons: lessons,
            chapters: chapters,
            finishedLessons: finishedLessons
        });
    }

    obtainLessonFromId(lessons) {
        // "this.dataFromParentComponent" will be "this.props" when this component has a parent
        return lessons.find(l => l.idLesson === this.dataFromParentComponent.idLessonInProgress);
    }

    obtainChapterFromLesson(chapters, lesson) {
        return chapters.find(c => c.idChapter === lesson.idChapter);
    }

    async fetchData() {
        let videos = await this.fetchVideos();
        let parsedVideos = VideoInterceptor.parse(videos);

        let chapters = await this.fetchChapters(this.dataFromParentComponent.idCourse);
        let parsedChapters = ChapterInterceptor.parse(chapters);

        let lessons = await this.fetchLessons(chapters);
        let parsedLessons = LessonInterceptor.parse(lessons);

        let finishedLessons = await this.fetchFinishedLessons(this.dataFromParentComponent.idCourseInProgress);
        let parsedFinishedLessons = FinishedLessonInterceptor.parse(finishedLessons);

        return {
            videos: parsedVideos, lessons: parsedLessons,
            chapters: parsedChapters, finishedLessons: parsedFinishedLessons
        };
    }

    async fetchVideos() {
        var videos;
        await axios.get('https://localhost:5001/api/video')
            .then(function (response) {
                videos = response.data;
            })
            .catch(function (error) {
                console.log("ERROR in getting videos: ", error);
            })
        return videos;
    }

    async fetchChapters(courseId) {
        var chapters;
        await axios.get('https://localhost:5001/api/chapter/course/' + courseId)
            .then(function (response) {
                chapters = response.data;
            })
            .catch(function (error) {
                console.log("ERROR in getting chapters: ", error);
            })
        return chapters;
    }

    async fetchLessons(chapters) {
        var lessons;
        var chaptersIds = this.obtainChaptersIDs(chapters);
        await axios.post('https://localhost:5001/api/lesson/chapter', chaptersIds)
            .then(function (response) {
                lessons = response.data;
            })
            .catch(function (error) {
                console.log("ERROR in getting lessons: ", error);
            })
        return lessons;
    }

    async fetchFinishedLessons(courseInProgressId) {
        var finishedLessons;
        await axios.get('https://localhost:5001/api/finishedlesson/course-in-progress/' + courseInProgressId)
            .then(function (response) {
                finishedLessons = response.data;
            })
            .catch(function (error) {
                console.log("ERROR in getting finished lessons: ", error);
            })
        return finishedLessons;
    }

    obtainChaptersIDs(chapters) {
        let chaptersIds = [];
        chapters.forEach(c => chaptersIds.push(c.idChapter))
        return chaptersIds;
    }

    handleChangeLesson(event) {
        event.preventDefault();
        let newLessonId = parseInt(event.target.id);
        var newCurrentLesson = this.findCurrentLesson(this.state.lessons, newLessonId);
        var newCurrentChapter = this.findCurrentChapter(this.state.chapters, newCurrentLesson.idChapter);
        var newVideoSrc = this.findVideoSrc(this.state.videos, newCurrentLesson.idVideo);
        this.setState({
            currentChapter: newCurrentChapter,
            currentLesson: newCurrentLesson,
            videoSrc: newVideoSrc
        });
    }

    findCurrentLesson(lessons, lessonId) {
        return lessons.find(lesson => {
            return lesson.idLesson === lessonId;
        });
    }

    findCurrentChapter(chapters, chapterId) {
        return chapters.find(capter => {
            return capter.idChapter === chapterId;
        });
    }

    findVideoSrc(videos, videoId) {
        return videos.find(v => {
            return v.idVideo === videoId;
        }).source;
    }

    render() {
        return (
            <div className="container">
                <VideoHeaders
                    chapter={this.state.currentChapter}
                    totalChapters={this.state.chapters}
                    lesson={this.state.currentLesson}
                    courseId={this.dataFromParentComponent.idCourse} />
                <div className="columns is-mobile">
                    <div className="column is-two-thirds">
                        <VideoPlayer videoWidth="750" videoHeight="" videoSrc={this.state.videoSrc} />
                    </div>
                    <div className="column is-one-third">
                        <ProgressBar
                            finishedLessons={this.state.finishedLessons}
                            totalLessons={this.state.lessons} />
                        <CourseContent chapters={this.state.chapters}
                            lessons={this.state.lessons}
                            currentLesson={this.state.currentLesson}
                            currentChapter={this.state.currentChapter}
                            onLessonChange={this.handleChangeLesson} />
                    </div>
                </div>
            </div>
        );
    }
}