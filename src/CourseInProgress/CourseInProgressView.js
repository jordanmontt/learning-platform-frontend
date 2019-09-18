import React from 'react'
import VideoPlayer from '../Video/VideoPlayer'
import CourseContentForCourseInProgress from './CourseContentForCourseInProgress'
import VideoHeaders from '../Video/VideoHeaders'
import HttpService from '../Services/HttpService';
import ProgressBar from '../ProgressBar/ProgressBar';
import Navbar from '../Navbar/Navbar';
import queryString from 'query-string';

export default class CourseInProgressView extends React.Component {
    constructor(props) {
        super(props);
        let urlParams = queryString.parse(this.props.location.search);
        this.handleChangeLesson = this.handleChangeLesson.bind(this);
        this.dataFromUrl = {
            idCourseInProgress: parseInt(urlParams.cp),
            idLessonInProgress: parseInt(urlParams.lp),
            idCourse: parseInt(urlParams.c),
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
        return lessons.find(l => l.idLesson === this.dataFromUrl.idLessonInProgress);
    }

    obtainChapterFromLesson(chapters, lesson) {
        return chapters.find(c => c.idChapter === lesson.idChapter);
    }

    async fetchData() {
        let chapters = await HttpService.fetchChapters(this.dataFromUrl.idCourse);
        let lessons = await HttpService.fetchLessons(chapters);
        let videos = await HttpService.fetchVideos(lessons);
        let finishedLessons = await HttpService.fetchFinishedLessonsFromCourseInProgress(this.dataFromUrl.idCourseInProgress);
        return {
            videos: videos, lessons: lessons,
            chapters: chapters, finishedLessons: finishedLessons
        };
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
        let searchedVideo;
        if (videos) {
            searchedVideo = videos.find(v => {
                return v.idVideo === videoId;
            });
        }
        if (searchedVideo)
            return searchedVideo.source;
        return "";
    }

    render() {
        return (
            <>
                <Navbar />
                <section className="hero is-link is-fullheight dashboard-background">
                    <div className="hero-head">
                        <div className="container">
                            <br />
                            <VideoHeaders
                                chapter={this.state.currentChapter}
                                totalChapters={this.state.chapters}
                                lesson={this.state.currentLesson}
                                courseId={this.dataFromUrl.idCourse} />
                        </div>
                    </div>
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-multiline is-centered is-mobile has-text-black">
                                <div className="column is-narrow is-two-thirds-desktop is-full-mobile">
                                    <VideoPlayer videoWidth="720" videoHeight="405" videoSrc={this.state.videoSrc} />
                                </div>
                                <div className="column is-narrow is-one-third-desktop is-full-mobile">
                                    <ProgressBar
                                        finishedLessons={this.state.finishedLessons}
                                        totalLessons={this.state.lessons} textColor="has-text-black" />
                                    <CourseContentForCourseInProgress chapters={this.state.chapters}
                                        lessons={this.state.lessons}
                                        currentLesson={this.state.currentLesson}
                                        currentChapter={this.state.currentChapter}
                                        onLessonChange={this.handleChangeLesson} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}