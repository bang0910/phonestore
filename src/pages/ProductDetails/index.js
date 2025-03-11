import { useEffect, useState } from "react";
import { getComments, getProductById, postComment } from "../../services/Api";
import { useParams, useNavigate } from "react-router-dom";
import { formatPrice, getImageProduct } from "../../shared/ultils";
import moment from "moment";
import { addToCart } from "../../redux-setup/reducers/cart";
import { useDispatch } from "react-redux";
const ProductDetails = () => {
  const [productItem, setProductItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  //mua hang
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: id,
        name: productItem.name,
        image: productItem.image,
        price: productItem.price,
        qty: 1,
      })
    );
    if (type === "buy-now") return navigate("/Cart");
  };
  //
  const changeComment = (e) => {
    const { name, value } = e.target;
    return setAddComment({ ...addComment, [name]: value });
  };
  const clickComment = () => {
    postComment(id, addComment)
      .then(({ data }) => {
        if (data.status === "success") {
          setAddComment({});
          getAddComments(id);
        }
      })
      .catch((error) => console.log(error));
  };
  const getAddComments = (id) => {
    getComments(id, {
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => setComments(data.data.docs))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setLoading(true);
    getProductById(id, {})
      .then(({ data }) => {
        setProductItem(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    getAddComments(id);
  }, [id]);
  if (loading) {
    return <div>Đang tải sản phẩm ... </div>;
  }

  return (
    <>
      {/*	List Product	*/}
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={getImageProduct(productItem?.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{productItem?.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {productItem?.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {productItem?.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {productItem?.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{formatPrice(productItem?.price)}</li>
              <li
                className={productItem?.is_stock ? "" : "text-danger"}
                id="status"
              >
                {productItem?.is_stock ? "Còn hàng" : "Hết hàng"}
              </li>
            </ul>
            {productItem.is_stock && (
              <div id="add-cart">
                <button
                  onClick={() => clickAddToCart("buy-now")}
                  className="btn btn-warning mr-2"
                >
                  Mua ngay
                </button>

                <button onClick={clickAddToCart} className="btn btn-info">
                  Thêm vào giỏ hàng
                </button>
              </div>
            )}
          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {productItem?.name} 64GB</h3>
            {productItem?.details}
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  onChange={changeComment}
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  value={addComment.name || ""}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  onChange={changeComment}
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  id="pwd"
                  value={addComment.email || ""}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>
                <textarea
                  onChange={changeComment}
                  name="content"
                  required
                  rows={8}
                  className="form-control"
                  value={addComment.content || ""}
                />
              </div>
              <button
                onClick={clickComment}
                type="button"
                name="sbm"
                className="btn btn-primary"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        <div id="comments-list" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {comments.map((comment, index) => {
              let m = moment(comment.createAt);
              return (
                <div key={index} className="comment-item">
                  <ul>
                    <li>
                      <b>{comment.name}</b>
                    </li>
                    <li>{m.fromNow()}</li>
                    <li>
                      <p>{comment.content}</p>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        {/*	End Comments List	*/}
      </div>
      {/*	End Product	*/}
    </>
  );
};
export default ProductDetails;
