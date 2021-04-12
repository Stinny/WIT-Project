import React, { Component } from 'react';
import lakeimg from '../imgs/lake.jpg';

//material ui
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

//antd
import { DatePicker, Space } from 'antd';

const useStyles = {
  box: {
    marginTop: '30px',
    height: '300px',
    backgroundColor: 'white',
  },
  img: {
    height: '400px',
    width: '900px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

class Search extends Component {
  render() {
    const { classes } = this.props;
    const { RangePicker } = DatePicker;

    return (
      <>
        <Container maxWidth='md' className={classes.box}>
          <RangePicker placeholder={['Start date...', 'End date...']} />
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(Search);
