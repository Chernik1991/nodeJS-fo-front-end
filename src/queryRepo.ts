const videoQueryRepo = {
    getVideos(): VideoOutputModel[] {
        const dbVideos: DBVideo[] = []
        const authors: DBAuthor[] = []
        return dbVideos.map(dbVideo => {
            const author = authors.find(a => a._id === dbVideo.authorId)
            return this._mapDBVideoToVideoOutputModel(dbVideo,author!)
        })
    },
    getVideosById(id: string): VideoOutputModel {
        const dbVideo: DBVideo = {
            _id: '2232',
            title: 'sds',
            authorId: '2323'
        }
        const author: DBAuthor = {
            _id: 'sdsd',
            lastName: 'sd',
            firstName: 'sd'
        }
        return this._mapDBVideoToVideoOutputModel(dbVideo,author)
    },
    _mapDBVideoToVideoOutputModel(dbVideo:DBVideo,dbAuthor:DBAuthor){
        return{
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: dbAuthor!._id, name: dbAuthor!.firstName + '' + dbAuthor!.lastName
            }
        }
    }

}

type DBVideo = {
    _id: string,
    title: string,
    authorId: string
}
type DBAuthor = {
    _id: string,
    firstName: string,
    lastName: string,
}

type VideoOutputModel = {
    id: string,
    title: string,
    author: {
        id: string,
        name: string
    }
}