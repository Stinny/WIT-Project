import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

//material ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

//antd
import { Comment, Tooltip, Avatar } from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';

const useStyles = makeStyles({
  reviewsBox: {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '30px',
    width: '900px',
    height: '270px',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'thin',
    overflowY: 'scroll',
  },
});

const Reviews = (listingId) => {
  const classes = useStyles();

  //form data
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`listings/reviews/${listingId.listingId}`)
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // const actions = [
  //   <Tooltip key='comment-basic-like' title='Like'>
  //     <span onClick={like}>
  //       {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
  //       <span className='comment-action'>{likes}</span>
  //     </span>
  //   </Tooltip>,
  //   <Tooltip key='comment-basic-dislike' title='Dislike'>
  //     <span onClick={dislike}>
  //       {React.createElement(
  //         action === 'disliked' ? DislikeFilled : DislikeOutlined
  //       )}
  //       <span className='comment-action'>{dislikes}</span>
  //     </span>
  //   </Tooltip>,
  //   <span key='comment-basic-reply-to'>Reply to</span>,
  // ];

  if (loading) {
    return <Container className={classes.reviewsBox}></Container>;
  }

  const displayNoReviews = (
    <Container>
      <Typography align='center' variant='h3' color='textSecondary'>
        No reviews yet
      </Typography>
    </Container>
  );

  return (
    <Container className={classes.reviewsBox}>
      {reviews.length > 0
        ? reviews.map((review, index) => (
            <Comment
              key={index}
              // actions={actions}
              author={review.userName}
              avatar={
                <Avatar
                  src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                  alt='Han Solo'
                />
              }
              content={review.content}
              datetime={
                <Tooltip
                  title={moment(review.createdOn).format('YYYY-MM-DD HH:mm:ss')}
                >
                  {<span>{moment(review.createdOn).format('MMM DD')}</span>}
                </Tooltip>
              }
            />
          ))
        : displayNoReviews}
    </Container>
  );
};

export default Reviews;
