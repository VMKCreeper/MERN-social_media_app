import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deletePost, likePost } from "../../features/posts/postSlice"
import styles from "./styles.module.css"
import moment from "moment"
import liked from "../images/liked.png"
import notliked from "../images/notliked.png"

const Post = ({data, currentPostId, setCurrentPostId, user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSameUser = user?.result?._id === data?.UID || user?.result?.sub === data?.UID
    const tags = data.tags.map((tag) => `#${tag.trim()} `)

    const handleEdit = () => {
        if (currentPostId){
            return setCurrentPostId(null)
        }
        setCurrentPostId(data._id)
    }

    const openPost = () => {
        navigate(`/posts/${data._id}`)
    }

    return(
        <div className={styles.memory}>
            <div className={styles.upper}>
                <img onClick={openPost} className={styles.image} src={data.selectedFile} alt="memorypic"></img>
                <div>
                    <div className={styles.row}>
                        <h2 className={styles.header}>{data.creator}</h2>
                        {isSameUser && <button className={styles.edit_btn} onClick={handleEdit}>
                            <span class="material-symbols-outlined">more_horiz</span>    
                        </button>}
                    </div>
                    <h3>{moment(data.createdAt).fromNow()}</h3>
                </div>
            </div>
            <div className={styles.lower}>
                <p className={styles.tags}>{tags}</p>
                <h2 className={styles.text}>{data.title}</h2>
                <p className={styles.text}>{data.message}</p>
            </div>
            <div className={styles.row}>
                <button className={styles.like_btn} disabled={!user?.result} onClick={() => dispatch(likePost({id: data._id, likeCount: data.likeCount}))}>
                    {
                        data.likeCount.includes(String(user?.result?.sub)) || data.likeCount.includes(String(user?.result?._id)) ? 
                        <img className={styles.likes} src={liked} alt="liked"></img> : 
                        <img className={styles.likes} src={notliked} alt="notliked"></img>
                    }
                    Likes: {data.likeCount.length}
                </button>
                {isSameUser && <button onClick={() => dispatch(deletePost(data._id))}>
                    <span class="material-symbols-outlined">delete</span>
                </button>}
            </div>
        </div>
    )
}

export default Post