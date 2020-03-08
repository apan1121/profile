import detectBrowserLanguage from 'detect-browser-language';
import Cookies from 'js-cookie';

import langPackage from 'lang/index';


const defaultLocale = Object.keys(langPackage)[0];

let locale = detectBrowserLanguage();

if (Cookies.get('langKey')){
    locale = Cookies.get('langKey');
}


if (!langPackage[locale]) {
    locale = defaultLocale;
}

window.localLang = locale;


const getLang = (langKey, data, defaultStr) => {
    let langStr = langKey;

    if (langPackage[locale] !== undefined) {
        let $array = JSON.parse(JSON.stringify(langPackage[locale]));
        const $keys = langKey.replace(/\//ig, '.').split('.');
        let $key = '';

        while ($keys.length > 1) {
            /* 取一筆 */
            $key = $keys.shift();

            /* 如果不存在 定義起來  */
            if (!$array[$key]) {
                $array[$key] = false;
            } else {
                $array = $array[$key];
            }
        }

        $key = $keys.shift();

        if (!!$array[$key] && 1) {
            let stringLang = $array[$key];
            if (typeof stringLang === 'string') {
                if (typeof data === 'object' && Object.keys(data).length > 0) {
                    for (const key in data) {
                        const value = data[key];
                        const re = new RegExp(`:${key}`);
                        stringLang = stringLang.replace(re, value);
                    }
                }
            }
            return stringLang;
        }

        if (!!defaultStr && 1) {
            return defaultStr;
        } else {
            return langKey;
        }


    //     if (langPackage[locale][langKey] != undefined) {
    //         langStr = langPackage[locale][langKey];
    //     } else if (langPackage[defaultLocale][langKey] != undefined) {
    //         langStr = langPackage[defaultLocale][langKey];
    //     }
    }

    return langStr;
};

export default getLang;