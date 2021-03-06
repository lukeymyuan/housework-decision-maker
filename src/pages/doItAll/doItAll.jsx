import Taro, { Component, chooseInvoiceTitle } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtButton, AtTag, AtNoticebar } from "taro-ui"
import Tab from '../../components/tab/tab'
import singleHousework from './single-housework.jpg'

const actions = { tag1: "老公", tag2: "老婆", tag3: "儿子", tag4: "女儿", tag5: "老妈", tag6: "老爸" };

export default class Index extends Component {
    config = {
        navigationBarTitleText: '谁全包'
    }

    onShareAppMessage(res) {
        if (res.from === 'button') {
            console.log(res.target)
        }
        return {
            title: '把家务全丢给老公！',
            path: '/pages/index/index'
        }
    }

    constructor() {
        super(...arguments);
        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.state = {
            isOpened: false,
            action: "",
            tag1: true,
            tag2: true,
            tag3: false,
            tag4: false,
            tag5: false,
            tag6: false,
            activeTags: []
        }
    }

    handleTagClick(item) {
        this.setState({ [item.name]: !item.active })
    }

    handleClick() {
        const tags = Object.keys(actions);
        const result = tags.filter(tag => this.state[tag] === true);
        this.setState({ activeTags: result }, () => {
            const action = actions[this.state.activeTags[Math.floor(Math.random() * this.state.activeTags.length)]];
            this.setState({ action: action, isOpened: true });
        })
    }

    handleModalClose() {
        this.setState({
            isOpened: false
        })
    }

    render() {
        return (
            <View >
                <AtNoticebar icon='volume-plus' close={true}>选择角色后来决定命运，深色的为默认已选,每次点击会消耗一金币</AtNoticebar>
                <View className='at-row at-row__justify--center'>
                    <Image
                        src={singleHousework}
                    />
                </View>
                <Text>{process.env.TARO_ENV === 'h5' ? <br /> : '\n'}</Text>

                <AtModal isOpened={this.state.isOpened} >
                    <AtModalHeader>{this.state.action}全包！</AtModalHeader>
                    <AtModalAction> <Button onClick={this.handleModalClose}>确定</Button> </AtModalAction>
                </AtModal>

                <View className='at-row at-row__justify--center'>
                    <View className='at-col at-col-3'><AtTag name='tag1' type='primary' active={this.state.tag1} onClick={this.handleTagClick}>
                        {actions.tag1}
                    </AtTag></View>
                    <View className='at-col at-col-3'><AtTag name='tag2' type='primary' active={this.state.tag2} onClick={this.handleTagClick}>
                        {actions.tag2}
                    </AtTag></View>
                    <View className='at-col at-col-3'><AtTag name='tag3' type='primary' active={this.state.tag3} onClick={this.handleTagClick}>
                        {actions.tag3}
                    </AtTag></View>
                </View>
                <Text>{process.env.TARO_ENV === 'h5' ? <br /> : '\n'}</Text>
                <View className='at-row at-row__justify--center'>
                    <View className='at-col at-col-3'><AtTag name='tag4' type='primary' active={this.state.tag4} onClick={this.handleTagClick}>
                        {actions.tag4}
                    </AtTag></View>
                    <View className='at-col at-col-3'><AtTag name='tag5' type='primary' active={this.state.tag5} onClick={this.handleTagClick}>
                        {actions.tag5}
                    </AtTag></View>
                    <View className='at-col at-col-3'><AtTag name='tag6' type='primary' active={this.state.tag6} onClick={this.handleTagClick}>
                        {actions.tag6}
                    </AtTag></View>
                </View>

                <Text>{process.env.TARO_ENV === 'h5' ? <br /> : '\n'}</Text>
                <Text>{process.env.TARO_ENV === 'h5' ? <br /> : '\n'}</Text>
                <View className='at-row at-row__justify--center'>
                    <View className='at-col at-col-5'>
                        <AtButton type='primary' circle='true' onClick={this.handleClick} >选完后点我决定命运</AtButton>
                    </View>
                </View>

                <Tab current={1} />
            </View >
        )
    }
}
