# coding: utf-8

import execjs
import requests

challenge_api = "https://wangluozhe.com/challenge/api/6"
headers = {
    'authority': 'wangluozhe.com',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://wangluozhe.com',
    'referer': challenge_api,
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
}

def get_signature():
    with open('run.js', 'r', encoding='utf-8') as f:
        js_compile = execjs.compile(f.read())
    return js_compile.call("getSign")

def main():
    result = 0
    for page in range(1, 101):
        data = {
            "page": page,
            "count": 10,
        }
        headers['cookie'] = 'session=; v={}'.format(
            get_signature()
        )
        print(headers)
        response = requests.post(url=challenge_api, headers=headers, data=data, verify=False)
        for each in response.json()['data']:
            result += each['value']
        print(result)
    print(result)  # 5108936


if __name__ == '__main__':
    main()
