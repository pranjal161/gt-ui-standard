import {language} from 'configs/index';

export const getAPIConfig =() => ({
    defaultHeader: {
        'content-type': 'application/json',
        'accept': 'application/vnd.hal+json',
        'accept-language': language,
        'x-auth-username': 'vatsekov',
        'x-api-key': '48SmqcLpec3t1TO8EMzaDaamMz25pDZ469NFux41'
    },
    multiHostUrlHeader: [],
    defaultHostUrl: 'http://20.33.40.147:13111/csc/insurance/',
    multiHostUrl: [],
    modifiedHeaderTag: 'X-GraphTalk-Modified'
})

export const APIConfig = getAPIConfig
