list1 = [{'state':'CA', 'city':'cupertino'},{'state':'NV', 'city':'cupertino'},{'state':'CA', 'city':'reno'}, {'state':'CA', 'city':'reno'} ]

def unique(a):
	return list(set(a))


print(unique(list1))