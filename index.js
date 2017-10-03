import React, { PureComponent } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');

export default class Swiper extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };
  }

  onScrollEndDrag(offset) {
    const { width, height, horizontal } = this.props; // eslint-disable-line

    const nextPage = horizontal
      ? this.calculateNextPage(offset.x, width)
      : this.calculateNextPage(offset.y, height);

    if (horizontal) {
      this.scroll.scrollTo({
        x: nextPage,
        animated: true,
      });
    } else {
      this.scroll.scrollTo({
        y: nextPage,
        animated: true,
      });
    }

    this.setState({ page: nextPage });
  }


  calculateNextPage(offset, distance) {
    const { throttle } = this.props;

    if (Math.abs(offset % distance) > throttle) {
      if (this.state.page - offset > 0) {
        return (this.state.page - distance);
      } else {
        return (this.state.page + distance);
      }
    } else {
      return this.state.page;
    }
  }

  scrollTo(index) {
    const { width, height, horizontal, children } = this.props; // eslint-disable-line
    let nextPage;

    if (index > children.length) {
      nextPage = horizontal ? (children.length - 1) * width : (children.length - 1) * height;
    } else if (index < 0) {
      nextPage = 0;
    } else {
      nextPage = horizontal ? index * width : index * height;
    }

    if (horizontal) {
      this.scroll.scrollTo({
        x: nextPage,
        animated: true,
      });
    } else {
      this.scroll.scrollTo({
        y: nextPage,
        animated: true,
      });
    }

    this.setState({ page: nextPage });
  }

  renderItem(item, index) {
    const { width, height } = this.props; // eslint-disable-line
    return (
      <View key={index} style={{ width, height }}>
        {item}
      </View>
    );
  }

  render() {
    const { horizontal, children, width, height, scrollViewProps } = this.props; // eslint-disable-line
    return (
      <ScrollView
        ref={(scroll) => {
          this.scroll = scroll;
        }}
        style={{ width, height }}
        horizontal={horizontal}
        onScrollEndDrag={(e) => { this.onScrollEndDrag(e.nativeEvent.contentOffset); }}
        {...scrollViewProps}
      >
        {children.map((item, index) => this.renderItem(item, index))}
      </ScrollView>
    );
  }
}

Swiper.propTypes = {
  horizontal: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  throttle: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  scrollViewProps: PropTypes.object,
};

Swiper.defaultProps = {
  horizontal: false,
  height,
  width,
  throttle: 100,
  scrollViewProps: {},
};
