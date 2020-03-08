import browser from 'browser-detect';

export default {
    setPageSetting(state, params){
        // const pageSetting = JSON.parse(JSON.stringify(state.pageSetting));
        // state.pageSetting = {
        //     ...pageSetting,
        //     ...params,
        // };

        Object.keys(params).forEach((key) => {
            state[`pageSetting_${key}`] = params[key];
        });
    },

    setBrowserInfo(state, params){
        const result = browser();
        let os_name = result.os || '';
        if (os_name.indexOf('OS X') !== -1) {
            /* 因為 ios 跟 mac os 都是 OS X 所以偵測 是不是 mobile 區分成 iOS 跟 Mac OS */
            if (result.mobile) {
                os_name = 'iOS';
            } else {
                os_name = 'Mac OS';
            }
        } else if (os_name.indexOf('Android') !== -1) {
            /* Android 版號太多，過濾成 Android */
            os_name = 'Android';
        }

        result.os = os_name;

        state.browser = result;

    },

    registerViewPercent(state, params){
        const viewPercent = JSON.parse(JSON.stringify(state.viewPercent));
        viewPercent[params.boxName] = params.viewPercent;
        state.viewPercent = viewPercent;
    },

    setFocusSkill(state, focusSkill){
        if (state.focusSkill !== focusSkill) {
            state.focusSkill = focusSkill;
        } else {
            state.focusSkill = '';
        }
    },
};