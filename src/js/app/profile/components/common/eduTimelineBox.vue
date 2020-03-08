<template>
    <div class="timeline-item focus" :class="{ 'view-in': view_in }">
        <div class="timeline-content">
            <div class="section-table">
                <div class="section-tr">
                    <div class="section-td" rel="th">
                        {{ getLang('common.title.school_name') }}
                    </div>
                    <div class="section-td">
                        {{ eduInfo.school_name }}
                    </div>
                </div>
                <div class="section-tr">
                    <div class="section-td" rel="th">
                        {{ getLang('common.title.edu_title') }}
                    </div>
                    <div class="section-td">
                        {{ eduInfo.edu_title }}
                    </div>
                </div>
                <div class="section-tr">
                    <div class="section-td" rel="th">
                        {{ getLang('common.title.experience') }}
                    </div>
                    <div class="section-td">
                        <div v-for="(experienceInfo, experienceIndex) in eduInfo.experience"
                            :key="experienceIndex"
                            class="section-td-item"
                        >
                            {{ experienceInfo }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border">
        </div>
        <div class="time" :data-start-date="eduInfo.startDate" :data-end-date="eduInfo.endDate"></div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { mixpanel } from 'lib/common/util';

import timeline from 'lib/common/mixins/timeline';


export default {
    components: {

    },
    mixins: [timeline],
    props: {
        eduInfo: {
            type: Object,
            default: () => {},
        },
    },
    data(){
        return {

        };
    },
    computed: {
        ...mapGetters([
        ]),
    },
    watch: {
        view_in(newVal){
            if (newVal) {
                this.viewInTimer = setTimeout(() => {
                    mixpanel.track('view_edu', { title: `${this.eduInfo.school_name} ${this.eduInfo.edu_title}` });
                }, 2000);
            } else {
                clearTimeout(this.viewInTimer);
            }
        },
    },
    mounted(){
    },
    methods: {
        ...mapActions({
        }),
    },
};
</script>