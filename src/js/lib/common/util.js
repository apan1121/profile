import string_module from './util/string';
import history_route_module from './util/history_route';
import func_module from './util/func';
import mixpanel_module from './util/mixpanel';
import exposure_module from './util/exposure';
import getLang_module from './util/getLang';


const util = {
    string: string_module,
    history_route: history_route_module,
    func: func_module,
    mixpanel: mixpanel_module,
    exposure: exposure_module,
    getLang: getLang_module,
};

export const string = string_module;
export const history_route = history_route_module;
export const mixpanel = mixpanel_module;
export const func = func_module;
export const exposure = exposure_module;
export const getLang = getLang_module;
export default util;
