import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtAccordion, AtButton, AtAvatar } from "taro-ui"
import Tab from './../../components/tab/tab'
import styles from './aboutUs.css'

const dayDifference = Math.ceil(Math.abs(new Date('5/2/2019') - new Date()) / (1000 * 60 * 60 * 24))

export default class Index extends Component {
    config = {
        navigationBarTitleText: '来聊聊'
    }

    onShareAppMessage(res) {
        if (res.from === 'button') {
            console.log(res.target)
        }
        return {
            title: '试试这个小程序，妈妈再也不用担心家务分工！',
            path: '/pages/index/index'
        }
    }

    constructor() {
        super(...arguments)
        this.state = {
            accordionOneOpened: false,
            accordionTwoOpened: false,
            accordionThreeOpened: true
        }
    }

    handleAccordionClick(accordion, value) {
        this.setState({
            [accordion]: value
        })
    }

    render() {
        return (
            <View>
                <Text>{process.env.TARO_ENV === 'h5' ? <br /> : '\n'}</Text>
                <AtAccordion
                    open={this.state.accordionThreeOpened}
                    onClick={this.handleAccordionClick.bind(this, 'accordionThreeOpened')}
                    icon={{ value: 'money', color: 'gold' }}
                    title='我的'
                    note='金币剩余: 10'
                >
                    <View className='at-row at-row__justify--center'>
                        <View className='at-col at-col-3'>
                            {process.env.TARO_ENV === 'h5' ? <AtAvatar circle text='凹'></AtAvatar> : <AtAvatar circle openData={{ type: "userAvatarUrl" }}></AtAvatar>}
                        </View>
                        <View className='at-col at-col-3' className={styles.username}>
                            {process.env.TARO_ENV === 'h5' ? "Luke" : <OpenData type='userNickName' />}
                        </View>
                    </View>
                </AtAccordion>
                <View className='at-article'>

                    <AtAccordion
                        open={this.state.accordionOneOpened}
                        onClick={this.handleAccordionClick.bind(this, 'accordionOneOpened')}
                        icon={{ value: 'help', color: 'red' }}
                        title='关于软件'
                        note='当前版本 1.0.3'
                    >
                        <View className='at-article__h3'>
                            作为家庭一员的你是否经常分担琐碎的家务劳动呢？有了这个小程序，妈妈再也不用担心我们如何家务分工了
                        </View>
                    </AtAccordion>
                    <AtAccordion
                        open={this.state.accordionTwoOpened}
                        onClick={this.handleAccordionClick.bind(this, 'accordionTwoOpened')}
                        icon={{ value: 'user', color: 'blue' }}
                        title='关于开发者'
                        note={'程序猿情侣在一起已经 ' + dayDifference + " 天了"}
                    >
                        <View className='at-article__h3'>
                            我们是有梦想，脑回路奇怪，爱折腾，爱猫的couple。欢迎帮我们转发，联系提供反馈，我们的邮箱是may02@outlook.com.au
                    </View>
                    </AtAccordion>
                    <Text>{process.env.TARO_ENV === 'h5' ? <br /> : '\n'}</Text>
                    <AtButton openType="share" type='secondary'>分享给好友领取金币</AtButton>
                </View>
                <Tab current={2} />
            </View>
        )
    }
}
