export default class VideoInterceptor {

    static parseVideo(unparsedVideo) {
        return {
            idVideo: parseInt(unparsedVideo.idVideo),
            source: unparsedVideo.source
        };
    }

    static parseVideos(unparsedVideos) {
        let parsedVideos = [];
        unparsedVideos.forEach(v => {
            parsedVideos.push(this.parseVideo(v));
        })
        return parsedVideos;
    }
}