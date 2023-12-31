import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPost, getPostsBySearch } from "../../features/posts/postSlice"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"
import styles from "./styles.module.css"
import CommentSection from "./CommentSection"

const SinglePost = ({user}) => {
    const {singlePost, posts, isLoading, isLoadingSinglePost} = useSelector((state) => state.post)
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openPost = (id) => {
        navigate(`/posts/${id}`)
    }

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        if(singlePost){
            dispatch(getPostsBySearch({searchQuery: "none", tags: singlePost?.tags?.join(",")}))
        }
    }, [singlePost._id])
    
    const recommendedPosts = posts.filter(({_id}) => _id !== singlePost?._id)
    
    if(isLoading || isLoadingSinglePost){
        return <h2>Loading...</h2>
    }

    return(
        <>
            <article className={styles.container}>
                <section className={styles.left}>
                    <div style={{borderBottom: "Solid"}}>
                        <h2 className={styles.title}>{singlePost?.title}</h2>
                        <p className={styles.tags}>{singlePost?.tags?.map((tag) => `#${tag.trim()} `)}</p>
                        <p>{singlePost?.message}</p>
                        <h1>Created by: {singlePost?.creator}</h1>
                        <p>{moment(singlePost?.createdAt).fromNow()}</p>
                    </div>
                    <CommentSection user={user} id={singlePost?._id} comments={singlePost?.comments}/>
                </section>
                <figure className={styles.post_img}>
                    <img className={styles.img} src={singlePost?.selectedFile} alt="Post"></img>
                </figure>
            </article>
            <article className={styles.container}>
                <h2>You might also like:</h2>
                <div className={styles.recommendedPosts}>
                    {
                        recommendedPosts.length > 0 ? (
                            recommendedPosts.map(({title, message, likeCount, creator, _id, selectedFile}) => {
                                return <section onClick={() => openPost(_id)} className={styles.post} key={_id}>
                                    <h2 className={styles.text}>{title}</h2>
                                    <p>{creator}</p>
                                    <p className={styles.text}>{message}</p>
                                    <p>Likes: {likeCount.length}</p>
                                    <img className={styles.rec_post_img} src={selectedFile}></img>
                                </section>
                            })
                        ) : <p>No similar posts</p>
                    }
                </div>
            </article>
        </>
    )
}

export default SinglePost