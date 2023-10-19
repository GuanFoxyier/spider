# coding: utf-8
import requests


class GetArgsCookie:
    @staticmethod
    def hex(string, key):
        result = ''
        index = 0x0
        digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        while index < len(string) and index < len(key):
            first_num = int(string[index: index + 0x2], 0x10)
            second_num = int(key[index: index + 0x2], 0x10)
            xor_result = first_num ^ second_num
            base = 0x10

            if xor_result == 0:
                final_num = digits[0]
            else:
                sign = 1 if xor_result > 0 else -1
                xor_result *= sign
                digits_list = []

                while xor_result:
                    digits_list.append(digits[int(xor_result % base)])
                    xor_result = int(xor_result / base)

                if sign < 0:
                    digits_list.append('-')

                digits_list.reverse()
                final_num = ''.join(digits_list)

            if len(final_num) == 0x1:
                final_num = '0' + final_num

            result += final_num
            index += 0x2
        return result

    def get_args2(self, arg1):
        _index_string = '3000176000856006061501533003690027800375'
        _index_list = [0xf, 0x23, 0x1d, 0x18, 0x21, 0x10, 0x1, 0x26, 0xa, 0x9, 0x13, 0x1f, 0x28, 0x1b, 0x16, 0x17, 0x19,
                       0xd, 0x6, 0xb, 0x27, 0x12, 0x14, 0x8, 0xe, 0x15, 0x20, 0x1a, 0x2, 0x1e, 0x7, 0x4, 0x11, 0x5, 0x3,
                       0x1c, 0x22, 0x25, 0xc, 0x24]
        _ordered_args = []
        _final_string = ''
        _current_index = 0x0
        while _current_index < len(arg1):
            _current_arg = arg1[_current_index]
            _index = 0x0
            while _index < len(_index_list):
                if _index_list[_index] == _current_index + 0x1:
                    if len(_ordered_args) <= _index:
                        for _ in range(_index - len(_ordered_args) + 1):
                            _ordered_args.append(None)
                    _ordered_args[_index] = _current_arg
                _index += 1
            _current_index += 1

        _final_string = ''.join(_ordered_args)

        return self.hex(_final_string, _index_string)

    @staticmethod
    def get_arg1():
        response = requests.get(
            'https://36kr.com/search/articles/LLM%20%E5%A4%A7%E6%A8%A1%E5%9E%8B%20AI',
            headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
            },
        )
        return response.content.decode().split("arg1='")[1].split("'")[0]

    def get_cookie(self):
        args1 = self.get_arg1()
        return self.get_args2(args1)

    @staticmethod
    def test(cookie):
        cookies = {
            'acw_sc__v2': cookie,
        }

        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        }

        response = requests.get(
            'https://36kr.com/search/articles/LLM%20%E5%A4%A7%E6%A8%A1%E5%9E%8B%20AI',
            cookies=cookies,
            headers=headers,
        )

        print(response.text)


if __name__ == '__main__':
    example = GetArgsCookie()
    ck = example.get_cookie()
    example.test(ck)
