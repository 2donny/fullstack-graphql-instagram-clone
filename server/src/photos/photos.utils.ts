export const processHashtags = (caption: string) => {
    const hashtagArr = caption.match(/#[\w|ㄱ-ㅎ|가-힣]+/g);
    return hashtagArr?.map(hashtag => ({
        where: { hashtag },
        create: { hashtag },
    }));
}
