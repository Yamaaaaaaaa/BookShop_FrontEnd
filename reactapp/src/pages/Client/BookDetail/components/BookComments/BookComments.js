import { useEffect, useState } from "react"
import "./BookComments.scss"
import { createComments, getComments, updateComments } from "../../../../../service/commentAndRatingService"
import { toast } from "react-toastify"

export default function BookComments({ bookId }) {
  const [comments, setComments] = useState([])
  const [myComment, setMyComment] = useState(null)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState("")
  const [editedRating, setEditedRating] = useState(5)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Safely get user from sessionStorage
    try {
      const userData = sessionStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }
  }, [])

  useEffect(() => {
    if (bookId && user?.id) {
      getAllCommentForBook()
      getMyCommentForBook()
    }
  }, [bookId, user?.id])

  useEffect(() => {
    if (myComment) {
      setEditedComment(myComment.comment || "")
      setEditedRating(myComment.rating || 5)
    }
  }, [myComment])

  const handleEditClick = () => {
    setIsEditing(true)
    setEditedComment(myComment?.comment || "")
    setEditedRating(myComment?.rating || 5)
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!user?.id) {
      toast.error("Vui lòng đăng nhập để đánh giá")
      return
    }

    if (!editedComment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá")
      return
    }

    try {
      const response = await createComments({
        bookId,
        userId: user.id,
        comment: editedComment,
        rating: editedRating,
      })

      if (response && response.status === 1) {
        toast.success(response.message || "Đã thêm đánh giá thành công")
        await getAllCommentForBook()
        await getMyCommentForBook()
        setEditedComment("")
      } else {
        toast.error(response?.message || "Không thể thêm đánh giá")
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi gửi đánh giá")
      console.error("Error submitting comment:", error)
    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    if (!myComment?.id) return

    if (!editedComment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá")
      return
    }

    try {
      const response = await updateComments({
        id: myComment.id,
        comment: editedComment,
        rating: editedRating,
      })

      if (response && response.status === 1) {
        toast.success(response.message || "Đã cập nhật đánh giá thành công")
        await getAllCommentForBook()
        await getMyCommentForBook()
        setIsEditing(false)
      } else {
        toast.error(response?.message || "Không thể cập nhật đánh giá")
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật đánh giá")
      console.error("Error updating comment:", error)
    }
  }

  // Render stars for rating display
  const renderStars = (rating, total = 5) => {
    const stars = []
    for (let i = 1; i <= total; i++) {
      stars.push(
        <span key={i} className={`book-comments__star ${i <= rating ? "book-comments__star--filled" : ""}`}>
          ★
        </span>,
      )
    }
    return stars
  }

  // Render interactive stars for rating input
  const renderRatingInput = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => setEditedRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          className="book-comments__star-button"
        >
          <span
            className={`book-comments__star ${(hoveredRating || editedRating) >= i ? "book-comments__star--filled" : ""}`}
          >
            ★
          </span>
        </button>,
      )
    }
    return stars
  }

  const getAllCommentForBook = async () => {
    try {
      const response = await getComments({ bookId })
      if (response && response.status === 1 && response.data) {
        setComments(response.data)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const getMyCommentForBook = async () => {
    if (!user?.id) return

    try {
      const response = await getComments({ bookId, userId: user.id })
      if (response && response.status === 1 && response.data?.length > 0) {
        setMyComment(response.data[0])
      }
    } catch (error) {
      console.error("Error fetching user comment:", error)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  if (!user) {
    return (
      <div className="book-comments">
        <div className="book-comments__container">
          <h2 className="book-comments__title">Đánh giá từ độc giả</h2>
          <p className="book-comments__no-data">Vui lòng đăng nhập để xem và thêm đánh giá</p>
        </div>
      </div>
    )
  }

  return (
    <div className="book-comments">
      <div className="book-comments__container">
        <h2 className="book-comments__title">Đánh giá từ độc giả</h2>

        {/* Comment form */}
        <div className="book-comments__form-container">
          <form onSubmit={isEditing ? handleSubmitEdit : handleSubmitComment} className="book-comments__form">
            <div className="book-comments__rating-input">
              <span className="book-comments__rating-label">Đánh giá của bạn:</span>
              <div className="book-comments__stars">{renderRatingInput()}</div>
            </div>

            {myComment && !isEditing ? (
              <div className="book-comments__item">
                <div className="book-comments__user-info">
                  <div className="book-comments__avatar">
                    <img
                      src={myComment.userAvatar || "/placeholder.svg"}
                      alt={myComment.User?.name || "User"}
                      className="book-comments__avatar-img"
                    />
                  </div>
                  <div className="book-comments__user-details">
                    <h4 className="book-comments__username">{myComment.User?.name || "Người dùng"}</h4>
                    <div className="book-comments__rating">{renderStars(myComment.rating)}</div>
                  </div>
                  <span className="book-comments__date">{formatDate(myComment.createdAt)}</span>
                </div>
                <div className="book-comments__textCTN">
                  <p className="book-comments__text">{myComment.comment}</p>
                  <button type="button" className="book-comments__submit-button" onClick={handleEditClick}>
                    Sửa đánh giá
                  </button>
                </div>
              </div>
            ) : (
              <>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  placeholder="Chia sẻ cảm nhận của bạn về quyển sách này..."
                  className="book-comments__textarea"
                ></textarea>

                <button type="submit" className="book-comments__submit-button">
                  {isEditing ? "Lưu chỉnh sửa" : "Gửi đánh giá"}
                </button>
              </>
            )}
          </form>
        </div>

        <div className="book-comments__list">
          <h3 className="book-comments__subtitle">Tất cả đánh giá</h3>

          {comments.length === 0 ? (
            <p className="book-comments__no-data">Sản phẩm chưa có đánh giá</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="book-comments__item">
                <div className="book-comments__user-info">
                  <div className="book-comments__avatar">
                    <img
                      src={comment.userAvatar || "/placeholder.svg"}
                      alt={comment.User?.name || "User"}
                      className="book-comments__avatar-img"
                    />
                  </div>
                  <div className="book-comments__user-details">
                    <h4 className="book-comments__username">{comment.User?.name || "Người dùng"}</h4>
                    <div className="book-comments__rating">{renderStars(comment.rating)}</div>
                  </div>
                  <span className="book-comments__date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="book-comments__text">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
