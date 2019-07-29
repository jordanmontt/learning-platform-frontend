import React from 'react'
import VideoPlayer from './VideoPlayer'
import CourseContent from './CourseContent'
import VideoHeaders from './VideoHeaders'

export default class ViewVideo extends React.Component {
    constructor(props) {
        super(props);
        var chapters = [
            { idChapter: 0, name: "Capitulo 1", chapterNumber: 1, idCourse: 1 },
            { idChapter: 1, name: "Capitulo 2", chapterNumber: 2, idCourse: 1 },
            { idChapter: 2, name: "Capitulo 3", chapterNumber: 3, idCourse: 1 },
            { idChapter: 3, name: "Capitulo 4", chapterNumber: 4, idCourse: 1 }]
        var lessons = [
            { idLesson: 0, idChapter: 0, name: "Leccion 1", idVideo: "/Videos/sample1.mp4" },
            { idLesson: 1, idChapter: 0, name: "Leccion 2", idVideo: "/Videos/sample2.mp4" },
            { idLesson: 2, idChapter: 1, name: "Leccion 1", idVideo: "/Videos/sample3.mp4" },
            { idLesson: 3, idChapter: 2, name: "Leccion 1", idVideo: "/Videos/sample4.mp4" },
            { idLesson: 4, idChapter: 3, name: "Leccion 1", idVideo: "/Videos/sample5.mp4" },
            { idLesson: 5, idChapter: 3, name: "Leccion 2", idVideo: "/Videos/sample3.mp4" }]
        this.handleChangeLesson = this.handleChangeLesson.bind(this);
        this.state = {
            chapters: chapters,
            lessons: lessons,
            courseName: "Introduccion a la inteligencia artificial",
            currentChapter: chapters[0],
            currentLesson: lessons[0],
        }
    }

    handleChangeLesson(event) {
        event.preventDefault();
        let newLessonId = parseInt(event.target.id);
        var newCurrentLesson = this.state.lessons.find(lesson => {
            return lesson.idLesson === newLessonId;
        })
        var newCurrentChapter = this.state.chapters.find(capter => {
            return capter.idChapter === newCurrentLesson.idChapter;
        })
        this.setState({
            currentChapter: newCurrentChapter,
            currentLesson: newCurrentLesson,
        });
    }

    render() {
        return (
            <div className="container ">
                <VideoHeaders
                    chapter={this.state.currentChapter}
                    totalChapters={this.state.chapters.length}
                    lesson={this.state.currentLesson}
                    courseName={this.state.courseName} />
                <div className="columns is-mobile">
                    <div className="column is-two-thirds">
                        <VideoPlayer videoWidth="750" videoHeight="" videoSrc={this.state.currentLesson.idVideo} />
                    </div>
                    <div className="column is-one-third">
                        <CourseContent chapters={this.state.chapters}
                            lessons={this.state.lessons}
                            currentLesson={this.state.currentLesson}
                            currentChapter={this.state.currentChapter}
                            onLessonChange={this.handleChangeLesson} />
                    </div>
                </div>
            </div>
        )
    }
}