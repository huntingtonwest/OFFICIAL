import re
# from server.models.associations import Associations

filtered_num = '(408) 123-1234'
# print(s[5:])
# s = re.sub(r'^[\(\)\- ]*$', '', filtered_num)
s = ''.join(filtered_num.split(')'))
s = ''.join(s.split('('))
s = ''.join(s.split(' '))
s = ''.join(s.split('-'))
# filtered_num.replace(' ','')
# s = ""
print(filtered_num)
print(s)
