import React from 'react'

export default class VideoPlayer extends React.Component {

    changeVideoSource() {
        var video = document.getElementById('video-player');
        video.src = this.getVideoSource();
    }

    componentDidUpdate(prevProps) {
        if (this.doesVideoSrcChanged(prevProps)) {
            this.changeVideoSource();
        }
    }

    doesVideoSrcChanged(prevProps) {
        return this.props.videoSrc !== prevProps.videoSrc;
    }

    getVideoSource() {
        return process.env.PUBLIC_URL + this.props.videoSrc;
    }

    render() {
        return (
            <div className="container">
                <video controls
                    width={this.props.videoWidth} height={this.props.videoHeight} id="video-player">
                    <source src={this.getVideoSource()} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </div>
        );
    }
}