import { useState } from "react"
import styles from "./styles.module.css"
import { useDispatch } from "react-redux"
import { commentPost } from "../../features/posts/postSlice"

const CommentSection = ({comments, id, user}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState([user?.name, ""])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(commentPost({id: id, comments: [comment, ...comments]}))
        setComment([user?.name, ""])
    }

    if (comments === undefined){
        return <h1>loading...</h1>
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2 style={{marginBottom: "5px"}}>Comments</h2>
            <section className={styles.commentSection}>
                {
                    comments?.map((comment, index) => {
                        return <p key={index}><span style={{fontWeight:"bold"}}>{comment[0]}</span>: {comment[1]}</p>
                    })
                }
            </section>
            {
                user && 
                <div style={{display: "flex"}}>
                    <input required placeholder="Add a comment" className={styles.input} value={comment[1]} onChange={(e) => setComment([user?.result?.name, e.target.value])}></input>
                    <button className={styles.comment_btn} type="submit">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </div>
            }
        </form>
    )
}

export default CommentSection