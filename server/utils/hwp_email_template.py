
def html_consultation_form(name, email, company_name, phone_number, tenant_rep, tenant_rep_city, coi, msg):

	html = "<table style='width:100%'>\
			<tr>\
				<td>name:</td>\
				<td>{0}</td>\
			</tr>\
				<td>email:</td>\
				<td>{1}</td>\
			<tr>\
			</tr>\
				<td>company name:</td>\
				<td>{2}</td>\
			<tr>\
			</tr>\
				<td>phone number:</td>\
				<td>{3}</td>\
			<tr>\
			</tr>\
				<td>tenant representative:</td>\
				<td>{4}</td>\
			<tr>\
			</tr>\
				<td>tenant representative city:</td>\
				<td>{5}</td>\
			<tr>\
			</tr>\
				<td>cities of interest:</td>\
				<td>{6}</td>\
			<tr>\
			</tr>\
				<td>message:</td>\
				<td>{7}</td>\
			<tr>\
			</table>".format(name, email, company_name, phone_number, tenant_rep, tenant_rep_city, coi, msg)

	return html