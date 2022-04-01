import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Slideshow from 'react-native-image-slider-show';

export default class ImageSlide extends PureComponent<{ listBanner: Array }> {

    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            interval: null,
        };
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.props.listBanner.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        const { listBanner } = this.props;
        if (!listBanner || listBanner?.length === 0) return null;
        return (
            <View>
                <Slideshow
                    dataSource={listBanner}
                    position={this.state.position}
                    containerStyle={{ borderRadius: 10, overflow: 'hidden' }}
                    arrowSize={0}
                    onPositionChanged={position => this.setState({ position })} />
            </View>
        );
    }
}
