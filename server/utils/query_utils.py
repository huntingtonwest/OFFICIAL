



def compare_dict(ref, dict):

	for r in ref:
		if not r in dict:
			return False
	return True


def get_cities(properties):
	for p in properties:
		city = p.city
		state = p.state