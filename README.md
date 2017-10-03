## Props
 Name | Default | Type
------|----------|-----------
horizontal |  false | bool
height | Dimensions.get('window').height | number
width | Dimensions.get('window').width | number
throttle | 100 | number
scrollViewProps | {} | object

## Component instance methods

You can access component methods by adding a `ref` (ie. `ref="swiper"`) prop to your `<Swiper>` element, then you can use `this.refs.swiper.scrollTo(index)`, etc. inside your component.

#### `scrollTo(nextPage: number)`

Absolute scroll to nextPage from current page (without overscroll, if `nextPage < 0`, scrollTo will scroll ScrollView to first page, same with `nextPage > children.length`)
