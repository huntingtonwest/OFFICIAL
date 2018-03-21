
def html_consultation_form(**kwargs):
	
	try:
		html = "<table style='width:100%'>\
				<tr>\
					<td>name:</td>\
					<td>{0}</td>\
				</tr>\
					<td>email:</td>\
					<td>{1}</td>\
				<tr>\
				</tr>\
					<td>phone number:</td>\
					<td>{2}</td>\
				<tr>\
				</tr>\
					<td>regarding:</td>\
					<td>{3}</td>\
				<tr>\
				</tr>\
					<td>message:</td>\
					<td>{4}</td>\
				<tr>\
				</table>".format(kwargs['name'], kwargs['email'], kwargs['phone_num'],
				kwargs['regarding'], kwargs['msg'])
	except:
		return ""

	return html

def html_contact_form(**kwargs):
	try:
		html = "<table style='width:100%'>\
				<tr>\
					<td>name:</td>\
					<td>{0}</td>\
				</tr>\
					<td>email:</td>\
					<td>{1}</td>\
				<tr>\
				</tr>\
					<td>phone number:</td>\
					<td>{2}</td>\
				<tr>\
				</tr>\
					<td>subject:</td>\
					<td>{3}</td>\
				<tr>\
				</tr>\
					<td>association:</td>\
					<td>{4}</td>\
				<tr>\
				</tr>\
					<td>unit:</td>\
					<td>{5}</td>\
				<tr>\
				</tr>\
					<td>message:</td>\
					<td>{6}</td>\
				<tr>\
				</table>".format(kwargs['name'], kwargs['email'], kwargs['phone_num'],
				kwargs['subject'], kwargs['association'], kwargs['unit'],kwargs['msg'])
	except:
		return ""

	return html