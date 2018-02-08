d = [{'var1':'cat','var2':'carrot'}, {'var1':'dog','var2':'onion'}, {'var1':'mouse','var2':'celery'}]

# s = set(val for dic in d for val in dic.values())
generator = list(s['var1'] for s in d)

print(generator)
for g in generator:
	print(g)