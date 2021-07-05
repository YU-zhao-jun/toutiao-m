<template>
  <div class='login-container'>
    <!-- 导航栏 -->
    <van-nav-bar
      class='app-nav-bar'
      title='注册 / 登录'
      left-arrow
      @click-left='$router.back()'
    />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form
      ref='login-form'
      @submit='onSubmit'
      @failed='onFailed'
      :show-error='false'
      :show-error-message='false'
      validate-first
    >
      <van-field
        v-model='user.mobile'
        icon-prefix='toutiao'
        left-icon='shouji'
        placeholder='请输入手机号'
        name='mobie'
        :rules='formRules.mobile'
      />
      <van-field
        v-model='user.code'
        clearable
        icon-prefix='toutiao'
        left-icon='yanzhengma'
        placeholder='请输入验证码'
        name='code'
        :rules='formRules.code'
      >
        <template #button>
          <van-button
            @click.prevent='onSendSms'
            class='send-btn'
            size='mini'
            round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class='login-btn-wrap'>
        <van-button class='login-btn' type='submit' block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|8|9]\d{9}$/, message: '请填写正确的手机号' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请填写正确的验证码' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      Toast.loading({
        message: '加载中...',
        // 禁止背景点击
        forbidClick: true,
        // 展示时长(ms)，值为 0 时，toast 不会消失
        duration: 0
      })
      try {
        const res = await login(this.user)
        console.log(res)
        if (res === undefined) {
          Toast.fail('登录失败')
        } else {
          Toast.success('登录成功')
        }
      } catch (err) {
        console.log(123,err)
        Toast.fail('登录失败')
      }
    },

    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },

    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        await sendSms(this.user.mobile)
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
        color: #fff;
      }
    }
  }
}
</style>
