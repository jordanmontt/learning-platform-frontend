export default class VideoInterceptor {

    static parseOne(unparsedVideo) {
        return {
            idVideo: parseInt(unparsedVideo.idVideo),
            source: unparsedVideo.source
        };
    }

    static parseMany(unparsedVideos) {
        let parsedVideos = [];
        unparsedVideos.forEach(v => {
            parsedVideos.push(this.parseOne(v));
        })
        return parsedVideos;
    }
}