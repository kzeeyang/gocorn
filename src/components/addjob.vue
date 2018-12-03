<template id="addjob">
<div>
    <div class="nav-tabs">
        <Select v-model="model1" style="width:200px">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div v-if="this.model1 == 'Ping'" style="margin-top: 15px;">
            <Form :model="Ping" label-position="left" :label-width="100">
                <FormItem label="监控地址">
                    <Input v-model="Ping.ip"></Input>
                </FormItem>
                <FormItem label="监控频率">
                    <Select v-model="Ping.timeInterval">
                        <Option v-for="item in timeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div v-if="this.model1 != ''">
            <Form :model="formLeft" label-position="left" :label-width="100">
                <FormItem label="启用邮件报警">
                    <i-switch v-model="mailSwitch" size="large">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                </FormItem>
                <div v-if="this.mailSwitch">
                    <div v-if="this.model1 == 'Ping'">
                        <FormItem label="丢包率">
                            <Select v-model="Ping.lost">
                                <Option v-for="item in 100" :value="item" :key="item">{{ item+"%" }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="邮件地址">
                            <Input v-model="mail.address"></Input>
                        </FormItem>
                        <FormItem label="邮件内容">
                            <Input v-model="mail.info" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                    </div>
                </div>
            </Form>
        </div>
        <div style="float: right;">
            <Button type="success">添加</Button>
        </div>
    </div> 
</div>
</template>

<script>
export default {
    data () {
        return {
            typeList: [
                {
                    value: 'Ping',
                    label: '添加Ping任务'
                },
                {
                    value: 'DNS',
                    label: '添加DNS任务'
                },
                {
                    value: 'HTTP',
                    label: '添加HTTP任务'
                },
            ],
            model1: 'Ping',
            mailSwitch: false,
            timeList: [
                {
                    value: 1,
                    label: '1分钟'
                },
                {
                    value: 5,
                    label: '5分钟'
                },
                {
                    value: 10,
                    label: '10分钟'
                },
                {
                    value: 30,
                    label: '30分钟'
                },
                {
                    value: 60,
                    label: '1小时'
                },
            ],
            timeInterval:'1',

            Ping: {
                ip: '',
                timeInterval: 5,
                lost: '',
            },

            mail: {
                address: '',
                info: '',
            }
        }
    }
}
</script>

<style scoped>
.nav-tabs{
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    width: 30%;
    align-items: center;
}
.formwidth {
    
    
}
</style>
